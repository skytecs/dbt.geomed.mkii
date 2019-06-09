using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dbt.Geomed.Models;
using Dbt.Geomed.Services;
using Dbt.Geomed.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Dbt.Geomed.Controllers
{
    public class EmailNotificationsController : Controller
    {
        private readonly IDataContext _context;
        private readonly ILogger<EmailNotificationsController> _logger;
        private readonly IMailNotificationService _mailService;

        public EmailNotificationsController(IDataContext context, ILogger<EmailNotificationsController> logger, IMailNotificationService mailNotificationService)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _mailService = mailNotificationService;
        }

        [HttpPost]
        [Route("api/notifycompanies")]
        public async Task<IActionResult> NotifyCompanies(NotificationCompaniesViewModel model)
        {
            var user = _context.Users.Where(x => x.Id == model.UserId).FirstOrDefault();
            if (user == null)
            {
                _logger.LogError($"User '{model.UserId}' was not found.");
                return NotFound(nameof(user));               
            }


            foreach (var companyItem in model.Companies)
            {
                var company = _context.Companies.FirstOrDefault(x => x.Id == companyItem.Id);
                if (company == null)
                {
                    _logger.LogError($"Company '{companyItem.Id}' was not found.");
                    continue;    // ??                    
                }

                if (String.IsNullOrEmpty(company.Email))
                {
                    _logger.LogError($"Company '{companyItem.Id}' has no '{nameof(company.Email)}'.");
                    continue;    // ??                    
                }
                
                var subject = companyItem.Name;
                var template = $@"Пациент {user.GetFullName()} записался на следующте услуг:\n{String.Join("\n", companyItem.Services.Select(x => x.Name))}";

                await _mailService.SendAsync(subject, template, company.Email);
            }
            return Ok();
        }
    }
}
