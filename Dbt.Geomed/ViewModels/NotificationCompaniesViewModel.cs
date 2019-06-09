using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dbt.Geomed.ViewModels
{
    public class NotificationCompaniesViewModel
    {
        public long UserId { get; set; }

        private List<NotifyingCompanyItem> _companies  = new List<NotifyingCompanyItem>();
        public List<NotifyingCompanyItem> Companies { get { return _companies; } }
    }

    public class NotifyingCompanyItem
    {
        public long Id { get;  set; }
        public string Name { get; set; }
        
        private List<CompanyServiceItem> _services = new List<CompanyServiceItem>();
        public List<CompanyServiceItem> Services { get { return _services; } }
    }

    public class CompanyServiceItem
    {
        public long Id { get; set; }
        public string Name { get; set; }
    }
}
