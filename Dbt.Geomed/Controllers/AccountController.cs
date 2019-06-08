﻿using System;
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
        public async Task<IActionResult> Authenticate([FromBody]AuthModel model)
        {
            if (String.IsNullOrWhiteSpace(model.Email))
            {
                //return new ApiErrorActionResult("email", ApiParameterErrorCode.Required);
            }

            if (String.IsNullOrWhiteSpace(model.Password))
            {
                //return new ApiErrorActionResult("password", ApiParameterErrorCode.Required);
            }

            var token = await _manager.Authenticate(model.Email, model.Password);

            if (token == null)
            {
                return Forbid();
            }

            return Json(new { token = token.Data, expires = token.Expires.ToUnixTimeMilliseconds(), stale = token.Stale.ToUnixTimeMilliseconds() });
        }



        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Refresh()
        {
            var token = await _manager.Refresh(User);

            if (token == null)
            {
                return Forbid();
            }

            return Json(new { token = token.Data, expires = token.Expires.ToUnixTimeMilliseconds(), stale = token.Stale.ToUnixTimeMilliseconds() });
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromBody]RegisterModel model)
        {
            if (String.IsNullOrWhiteSpace(model.Email))
            {
                return new ApiErrorActionResult("email", ApiParameterErrorCode.Required);
            }

            if (String.IsNullOrWhiteSpace(model.Firstname))
            {
                return new ApiErrorActionResult("firstname", ApiParameterErrorCode.Required);
            }

            if (String.IsNullOrWhiteSpace(model.Lastname))
            {
                return new ApiErrorActionResult("lastName", ApiParameterErrorCode.Required);
            }

            if (String.IsNullOrWhiteSpace(model.Password))
            {
                return new ApiErrorActionResult("password", ApiParameterErrorCode.Required);
            }

            Token token;

            try
            {
                token = await _manager.Register(model.Firstname, model.Lastname, model.Email, model.Password);
            }
            //catch (InvalidOperationException ex)
            //{
            //    return new ApiErrorActionResult(ApiResponseStatus.EmailInUse);
            //}
            catch (Exception ex)
            {
                throw;
            }

            if (token == null)
            {
                return Forbid();
            }

            return Json(new { token = token.Data, expires = token.Expires.ToUnixTimeMilliseconds(), stale = token.Stale.ToUnixTimeMilliseconds() });
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

    internal class ApiErrorActionResult : IActionResult
    {
        public string FieldName;
        private ApiParameterErrorCode ErrorCode;

        public ApiErrorActionResult(string fieldName, ApiParameterErrorCode errorCode)
        {
            this.FieldName = fieldName;
            this.ErrorCode = errorCode;
        }

        public Task ExecuteResultAsync(ActionContext context)
        {
            throw new NotImplementedException();
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