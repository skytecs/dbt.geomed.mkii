using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dbt.Geomed.Models;
using Dbt.Geomed.Services;
using Dbt.Geomed.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
            var prices = _context.Prices
                .Include(x => x.Service)
                .Include(x => x.Company)
                .Where(x => model.PriceIds.Contains(x.Id))
                .Select(x => new { x.Company.Email, x.Service.Name })
                .ToList();

            foreach (var companyItem in prices.GroupBy(x => x.Email))
            {
                if (!string.IsNullOrEmpty(companyItem.Key))
                {
                    continue;
                }

                var subject = "Вам лид от Геомеда";
                var template = $@"Пациент {model.Lastname} {model.Firstname} моб. тел.{model.Phone} записался на следующие услуг:\n{String.Join("\n", companyItem.Select(x => x.Name))}";

                await _mailService.SendAsync(subject, template, companyItem.Key);
            }
            return Ok();
        }
    }
}
