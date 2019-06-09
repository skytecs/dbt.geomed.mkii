using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dbt.Geomed.Services
{
    public class MailNotificationSettings
    {
        public int Port { get; set; }
        public bool EnableSsl { get; set; }
        public string Host { get; set; }
        public int Timeout { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}
