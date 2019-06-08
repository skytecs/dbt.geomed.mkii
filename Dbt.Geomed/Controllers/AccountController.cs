using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Dbt.Geomed.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace Dbt.Geomed.Controllers
{
    [Route("api/[controller]/[action]")]
    public class AccountController : Controller
    {
        readonly IUserManager _manager;
        private readonly ILogger<AccountController> _logger;
        //private readonly IMailNotificationService _notificationService;
       // private readonly ICaptchaService _captchaService;

       // private readonly CaptchaSettings _captchaSettings;

        public AccountController(
            ILogger<AccountController> logger,
            IUserManager manager
            //IMailNotificationService notificationService,
            //ICaptchaService captchaService,
            //IOptions<CaptchaSettings> options
            )
        {
            _manager = manager ?? throw new ArgumentNullException(nameof(manager));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            //_notificationService = notificationService ?? throw new ArgumentNullException(nameof(notificationService));
            //_captchaService = captchaService ?? throw new ArgumentNullException(nameof(captchaService));
            //if (options == null || options.Value == null)
            //{
            //    throw new ArgumentNullException(nameof(options));
            //}

            //_captchaSettings = options.Value;
        }

        [HttpPost]
        [Produces(typeof(LoggedInAccountModel))]
        public async Task<IActionResult> Authenticate([FromBody]AuthModel model)
        {
            if (String.IsNullOrWhiteSpace(model.Email))
            {
                return BadRequest("email is required");
            }

            if (String.IsNullOrWhiteSpace(model.Password))
            {
                return BadRequest("password is required");
            }

            var token = await _manager.Authenticate(model.Email, model.Password);

            if (token == null)
            {
                return Forbid();
            }

            return Json(new LoggedInAccountModel { Token = token.Data, Expires = token.Expires.ToUnixTimeMilliseconds(), Stale = token.Stale.ToUnixTimeMilliseconds() });
        }



        [Authorize]
        [HttpPost]
        [Produces(typeof(LoggedInAccountModel))]
        public async Task<IActionResult> Refresh()
        {
            var token = await _manager.Refresh(User);

            if (token == null)
            {
                return Forbid();
            }

            return Json(new LoggedInAccountModel { Token = token.Data, Expires = token.Expires.ToUnixTimeMilliseconds(), Stale = token.Stale.ToUnixTimeMilliseconds() });
        }

        [HttpPost]
        [Produces(typeof(LoggedInAccountModel))]
        public async Task<IActionResult> Register([FromBody]RegisterModel model)
        {
            if (String.IsNullOrWhiteSpace(model.Email))
            {
                return BadRequest("email is required");
            }

            if (String.IsNullOrWhiteSpace(model.Password))
            {
                return BadRequest("password is required");
            }

            Token token;

            try
            {
                token = await _manager.Register(model.Email, model.Password);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest("email in use");
            }
            catch (Exception ex)
            {
                throw;
            }

            if (token == null)
            {
                return Forbid();
            }

            return Json(new LoggedInAccountModel { Token = token.Data, Expires = token.Expires.ToUnixTimeMilliseconds(), Stale = token.Stale.ToUnixTimeMilliseconds() });
        }

        //[Authorize]
        //[HttpPut]
        //public async Task<IActionResult> Password([FromBody] ChangePasswordModel model)
        //{
        //    if (String.IsNullOrWhiteSpace(model.OldPassword))
        //    {
        //        return new ApiErrorActionResult("oldPassword", ApiParameterErrorCode.Required);
        //    }

        //    if (String.IsNullOrWhiteSpace(model.NewPassword))
        //    {
        //        return new ApiErrorActionResult("newPassword", ApiParameterErrorCode.Required);
        //    }

        //    var userId = await _manager.GetId(User);

        //    if (!await _manager.CheckPassword(userId, model.OldPassword))
        //    {
        //        return new ApiErrorActionResult("oldPassword", ApiParameterErrorCode.Invalid);
        //    }

        //    await _manager.ChangePassword(userId, model.NewPassword);

        //    return Ok();
        //}

        //[HttpPost]
        //public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordModel model)
        //{
        //    if (!Request.Host.Value.Contains("localhost") && this._captchaSettings.Use && !await _captchaService.Verify(model.Captcha))
        //    {
        //        return new ApiErrorActionResult(ApiResponseStatus.CaptchaVerificationFailed);
        //    }

        //    var result = await _manager.ResetPassword(model.Email);

        //    if (result == ResetPasswordStatus.Succes)
        //    {
        //        return Ok();
        //    }

        //    return new ApiErrorActionResult("email", ApiParameterErrorCode.Invalid);
        //}


        public class LoggedInAccountModel
        {
            public string Token { get; internal set; }
            public long Expires { get; internal set; }
            public long Stale { get; internal set; }
        }

        public class RegisterModel
        {
            public string Firstname { get; set; }
            public string Lastname { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
        }

        public class AuthModel
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }

        public class ResetPasswordModel
        {
            public string Email { get; set; }
            public string Captcha { get; set; }
        }

    }

    public enum ApiParameterErrorCode
    {
        Required = 1
    }

    public class ChangePasswordModel
    {
        public string NewPassword { get; set; }
        public string OldPassword { get; set; }
    }
}