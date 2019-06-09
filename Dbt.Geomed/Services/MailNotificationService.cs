using Dbt.Geomed.Models;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;

namespace Dbt.Geomed.Services
{
    public interface IMailNotificationService
    {
        Task SendAsync(string subject, string template, string email);

        /// <summary>
        /// Уведомить получателя о событии
        /// </summary>
        /// <param name="type">тип уведомления</param>
        /// <param name="email">адрес получателя</param>
        /// <param name="metadata">данные для отслеживания обработки письма</param>
        /// <param name="substitutions">подстановки</param>
        /// <returns></returns>
        Task<bool> SendAsync(NotificationType type, string email, IDictionary<string, string> substitutions, IDictionary<string, string> metadata = null);

        /// <summary>
        /// Уведомить получателя о событии
        /// </summary>
        /// <param name="subject">тема письма</param>
        /// <param name="template">шаблон письма</param>
        /// <param name="email">адрес получателя</param>
        /// <param name="metadata">данные для отслеживания обработки письма</param>
        /// <param name="substitutions">подстановки</param>
        /// <returns></returns>
        Task SendAsync(string subject, string template, string email, IDictionary<string, string> substitutions, IDictionary<string, string> metadata = null);
    }

    public class MailNotificationService : IMailNotificationService
    {
        private readonly IDataContext _context;
        private readonly ILogger<MailNotificationService> _logger;
        private SmtpClient _client;

        public IOptions<MailNotificationSettings> _settings { get; }

        public MailNotificationService(IDataContext context, ILogger<MailNotificationService> logger, IOptions<MailNotificationSettings> settings)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _settings = settings ?? throw new ArgumentNullException(nameof(settings));

            CreateClient();
        }

        public async Task SendAsync(string subject, string template, string email)
        {
            if (_client == null)
            {
                CreateClient();
            }

            var message = new MailMessage();
            message.Subject = subject;
            message.Body = template;
            message.To.Add(new MailAddress(email));

            await _client.SendMailAsync(message);
        }

        private void CreateClient()
        {
            var settings = _settings.Value;

            var client = new SmtpClient();
            client.Port = settings.Port;
            client.Host = settings.Host;
            client.EnableSsl = settings.EnableSsl;
            client.Timeout = settings.Timeout;
            client.DeliveryMethod = SmtpDeliveryMethod.Network;
            client.UseDefaultCredentials = false;
            client.Credentials = new System.Net.NetworkCredential(settings.UserName, settings.Password);

            _client = client;
        }

        public Task<bool> SendAsync(NotificationType type, string email, IDictionary<string, string> substitutions, IDictionary<string, string> metadata = null)
        {
            throw new NotImplementedException();
        }

        public Task SendAsync(string subject, string template, string email, IDictionary<string, string> substitutions, IDictionary<string, string> metadata = null)
        {
            throw new NotImplementedException();
        }

        //public async Task<bool> SendAsync(NotificationType type, string email, IDictionary<string, string> substitutions, IDictionary<string, string> metadata = null)
        //{
        //    var templateRecord = _context.EmailNotificationTemplates
        //        .OrderByDescending(x => x.Updated)
        //        .Where(x => x.NotificationType == type)
        //        .Select(x => new { x.Template, x.Subject })
        //        .FirstOrDefault();

        //    if (templateRecord == null)
        //    {
        //        _logger.LogError($"Email template for '{type.GetDescription()}({type})' is not available.");
        //        return false;
        //    }



        //    var template = templateRecord.Template;
        //    var subject = templateRecord.Subject;

        //    return await Send(subject, template, email, substitutions, metadata);
        //}
    }

    public enum NotificationType
    {
    }
}
