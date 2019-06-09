using Dbt.Geomed.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;

namespace Dbt.Geomed.Services
{
    public interface IUserManager
    {
        Task<Token> Authenticate(string email, string password);
        Task<Token> Refresh(ClaimsPrincipal user);
        Task<Token> Register(string email, string password, string lastname, string firstname);
        Task<User> Register(string name);
        Task<int> GetId(ClaimsPrincipal user);

        Task<bool> CheckPassword(int accountId, string password);
        //Task ChangePassword(int accountId, string password);

        //Task<bool> IsAdmin(string account);

        //Task<ResetPasswordStatus> ResetPassword(string email);
    }

    public class Token
    {
        public Token(string data, DateTimeOffset expires, DateTimeOffset stale)
        {
            Data = string.IsNullOrWhiteSpace(data) ? throw new ArgumentNullException(nameof(data)) : data;
            Expires = expires;
            Stale = stale;
        }

        /// <summary>
        /// Данные токена
        /// </summary>
        public string Data { get; }
        /// <summary>
        /// Время жизни
        /// </summary>
        public DateTimeOffset Expires { get; }
        /// <summary>
        /// Время рекомендуемого обновления
        /// </summary>
        public DateTimeOffset Stale { get; }
    }

    public class UserManager : IUserManager
    {
        private readonly TimeSpan _tokenLifetime = TimeSpan.FromDays(365);

        private readonly IDataContext _dataContext;
        private readonly IConfiguration _config;

        //private readonly AdministrationSettings _administrationSettings;
        //private readonly IMailNotificationService _notificationService;

        //public UserManager(DataContext dataContext, IConfiguration config, IOptions<AdministrationSettings> administrationSettings, IMailNotificationService notificationService)
        public UserManager(IDataContext dataContext, IConfiguration config)
        {
            _dataContext = dataContext ?? throw new ArgumentNullException(nameof(dataContext));
            _config = config ?? throw new ArgumentNullException(nameof(config));
        }

        private string ComputeHash(string password)
        {
            var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));

            var encoding = new UTF8Encoding();

            var hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));

            string hex = BitConverter.ToString(hash);
            return hex.Replace("-", "").ToLowerInvariant();
        }

        private DateTime GetStalePeriod(DateTime now, DateTime expires)
        {
            if (now > expires.AddHours(-1))
            {
                return now + (expires - now) / 4;
            }

            return now + (expires - now) / 60;
        }

        public async Task<Token> Authenticate(string username, string password)
        {
            var hash = ComputeHash(password);

            var customer = await _dataContext.Users.SingleOrDefaultAsync(x => x.Email == username && x.Password == hash);

            if (customer == null)
            {
                return null;
            }

            var claims = new Dictionary<string, string>
            {
                {ClaimTypes.NameIdentifier, customer.Id.ToString("N0")}
            };

            //if (await IsAdmin(username))
            //{
            //    claims.Add(ClaimTypes.Role, "Administrator");
            //}

            var expires = DateTime.UtcNow.Add(_tokenLifetime);

            return new Token(GetToken(username, claims, expires), new DateTimeOffset(expires), new DateTimeOffset(GetStalePeriod(DateTime.UtcNow, expires)));
        }

        public async Task<Token> Refresh(ClaimsPrincipal user)
        {
            var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);

            var claims = new Dictionary<string, string>
            {
                {ClaimTypes.NameIdentifier, userId}
            };

            //if (await IsAdmin(user.Identity.Name))
            //{
            //    claims.Add(ClaimTypes.Role, "Administrator");
            //}

            var expires = DateTime.UtcNow.Add(_tokenLifetime);

            return new Token(GetToken(user.Identity.Name, claims, expires), new DateTimeOffset(expires), new DateTimeOffset(GetStalePeriod(DateTime.UtcNow, expires)));

        }

        public async Task<Token> Register(string username, string password, string lastname, string firstname)
        {
            if (_dataContext.Users.Any(x => x.Email == username))
            {
                throw new InvalidOperationException($"Пользователь с логином '{username}' уже существует.");
            }

            var customer = new User
            {
                Email = username.ToLowerInvariant(),
                Password = ComputeHash(password),
                Lastname = lastname,
                Firstname = firstname
            };

            _dataContext.Users.Add(customer);

            await _dataContext.SaveChangesAsync();

            var claims = new Dictionary<string, string>
            {
                {ClaimTypes.NameIdentifier, customer.Id.ToString("N0")}
            };

            //if (await IsAdmin(customer.Email))
            //{
            //    claims.Add(ClaimTypes.Role, "Administrator");
            //}

            var expires = DateTime.UtcNow.Add(_tokenLifetime);

            return new Token(GetToken(customer.Email, claims, expires), new DateTimeOffset(expires), new DateTimeOffset(GetStalePeriod(DateTime.UtcNow, expires)));

        }

        public async Task<User> Register(string email, string name = null, string phone = null)
        {

            if (!String.IsNullOrWhiteSpace(email) && await _dataContext.Users.AnyAsync(x => x.Email == email.ToLowerInvariant().Trim()))
            {
                return null;
            }

            //if (!String.IsNullOrWhiteSpace(phone) && await _dataContext.Users.AnyAsync(x => x.Phone == phone.ToLowerInvariant().Trim()))
            //{
            //    return null;
            //}

            var parsed = String.IsNullOrWhiteSpace(name) ?
                new List<string>()
                : name.Split(new char[] { ' ' }, StringSplitOptions.RemoveEmptyEntries).ToList();

            var firstname = parsed.Count() > 0 ? parsed.First() : String.Empty;
            var lastname = parsed.Count() > 1 ? parsed.Last() : String.Empty;

            var account = new User
            {
                Email = email?.ToLowerInvariant().Trim() ?? String.Empty,
                Firstname = firstname,
                Lastname = lastname,
                Password = ComputeHash(Guid.NewGuid().ToString()),
                //Phone = phone?.Trim() ?? String.Empty
            };

            _dataContext.Users.Add(account);
            await _dataContext.SaveChangesAsync();
            return account;
        }

        public Task<User> Register(string name)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> ChangePassword(string passwordChangeToken, string newPassword)
        {
            if (String.IsNullOrWhiteSpace(newPassword))
            {
                return false;
            }

            if (!ValidatePasswordChangeToken(passwordChangeToken, out int id))
            {
                return false;
            }

            var account = await _dataContext.Users.FirstOrDefaultAsync(x => x.Id == id);

            if (account == null)
            {
                return false;
            }

            account.Password = ComputeHash(newPassword);
            await _dataContext.SaveChangesAsync();
            return true;
        }

        public async Task<int> GetId(ClaimsPrincipal user)
        {
            var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);

            if (int.TryParse(userId, out var id))
            {
                return id;
            }

            throw new InvalidOperationException("principal object is invalid");
        }

        //public async Task<bool> IsAdmin(string login)
        //{
        //    return this._administrationSettings.Administrators.Any(x => String.Compare(x.Trim(), login.Trim(), false) == 0);
        //}

        /// <summary>
        /// Создать токенъ для смены пароля указанного пользователя
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public string CreatePasswordChangeToken(int id)
        {
            var handler = new JwtSecurityTokenHandler();
            var key = _config["Jwt:Key"];
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            var signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);


            var header = new JwtHeader(signingCredentials);
            var payload = new JwtPayload(
                _config["Jwt:Issuer"],
                _config["Jwt:Issuer"],
                new List<Claim>
                {
                    new Claim(ClaimTypes.NameIdentifier, id.ToString()),
                },
                DateTime.Now,
                DateTime.Now.AddMinutes(5));

            var token = new JwtSecurityToken(header, payload);
            return handler.WriteToken(token);
        }

        public async Task<Boolean> CheckPassword(int id, string password)
        {
            if (String.IsNullOrWhiteSpace(password))
            {
                throw new ArgumentNullException(nameof(password));
            }

            var account = await _dataContext.Users
                .FirstOrDefaultAsync(x => x.Id == id);

            if (account == null)
            {
                return false;//throw error?
            }

            var hash = ComputeHash(password);

            return string.Compare(account.Password, hash, false) == 0;
        }

        //public async Task ChangePassword(int id, string password)
        //{
        //    var account = await _dataContext.Users
        //        .FirstOrDefaultAsync(x => x.Id == id);

        //    if (account == null)
        //    {
        //        return;//throw error?
        //    }

        //    account.Password = ComputeHash(password);
        //    await _dataContext.SaveChangesAsync();

        //    await _notificationService.SendPasswordChangedNotification(account);
        //}

        private bool ValidatePasswordChangeToken(string encrypted, out int id)
        {
            if (String.IsNullOrWhiteSpace(encrypted))
            {
                id = 0;
                return false;
            }
            var validationParameters = new TokenValidationParameters
            {
                RequireSignedTokens = true,
                ValidateIssuerSigningKey = true,
                ValidateLifetime = true,
                ValidateAudience = true,
                ValidateIssuer = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]))
            };

            var handler = new JwtSecurityTokenHandler();
            ClaimsPrincipal principal;

            try
            {
                principal = handler.ValidateToken(encrypted, validationParameters, out SecurityToken validToken);
            }
            catch (Exception e)
            {
                //Много разных исключений
                id = 0;
                return false;
            }
            var claim = principal.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier);

            if (claim != null && Int32.TryParse(claim.Value, out id))
            {
                return true;
            }

            id = 0;
            return false;
        }

        private string GetToken(string username, IDictionary<string, string> claims, DateTime? expires = null)
        {
            var handler = new JwtSecurityTokenHandler();
            var key = _config["Jwt:Key"];
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            var signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);

            var identity = new ClaimsIdentity(new GenericIdentity(username), claims.Select(x => new Claim(x.Key, x.Value)).ToArray());
            var token = handler.CreateJwtSecurityToken(subject: identity, signingCredentials: signingCredentials, audience: _config["Jwt:Issuer"],
            issuer: _config["Jwt:Issuer"],
            expires: expires ?? DateTime.UtcNow.AddHours(12));
            var tokenData = handler.WriteToken(token);
            return tokenData;
        }

        public Task ChangePassword(int accountId, string password)
        {
            throw new NotImplementedException();
        }

        public Task<bool> IsAdmin(string account)
        {
            throw new NotImplementedException();
        }

        public Task<ResetPasswordStatus> ResetPassword(string email)
        {
            throw new NotImplementedException();
        }

        //public async Task<ResetPasswordStatus> ResetPassword(string email)
        //{
        //    if (String.IsNullOrWhiteSpace(email))
        //    {
        //        throw new ArgumentNullException(nameof(email));
        //    }


        //    var account = await _dataContext.Users
        //        .FirstOrDefaultAsync(x => x.Email != null && x.Email.ToLowerInvariant() == email.ToLowerInvariant());

        //    if (account == null)
        //    {
        //        return ResetPasswordStatus.UserNotFound;
        //    }

        //    var password = Guid.NewGuid().ToString().Replace("-", string.Empty).Substring(3, 8);

        //    account.Password = ComputeHash(password);

        //    await _dataContext.SaveChangesAsync();

        //    await _notificationService.SendChangePasswordInvitation(account, password);

        //    return ResetPasswordStatus.Succes;
        //}


    }

    public enum ResetPasswordStatus
    {
        Unknown = 0,
        Succes = 1,
        UserNotFound = 2
    }
}
