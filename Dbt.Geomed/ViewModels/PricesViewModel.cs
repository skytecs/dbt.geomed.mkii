using Dbt.Geomed.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dbt.Geomed.ViewModels
{
    public class PricesViewModel
    {
        public PricesViewModel(List<Price> prices)
        {
            foreach (var commpany in prices.GroupBy(x => x.Company))
            {
                var companyItem = new CompayItem
                {
                    Id = commpany.Key.Id,
                    Name = commpany.Key.Name
                };

                foreach (var price in commpany)
                {
                    var service = price.Service;
                    var serviceItem = new ServiceItem
                    {
                        Id = service.Id,
                        Name = service.Name,
                        Code = service.GetCode(),
                        Amount = price.Amount
                    };

                    companyItem.Services.Add(serviceItem);
                }

                Companies.Add(companyItem);
            }

        }

        public List<CompayItem> Companies { get; set; }
    }

    public class CompayItem
    {
        public long Id { get; set; }
        public string Name { get; set; }
        private readonly List<ServiceItem> _services = new List<ServiceItem>();
        public List<ServiceItem> Services
        {
            get
            {
                return _services;
            }
        }
    }

    public class ServiceItem
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public object Code { get; set; }
        public decimal Amount { get; set; }
    }
}
