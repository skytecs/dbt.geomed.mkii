using Dbt.Geomed.Models;
using Dbt.Geomed.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dbt.Geomed.ViewModels
{
    public class PricesViewModel
    {
        public PricesViewModel(List<Price> prices, List<Services.CompanyDistance> matrix)
        {
            foreach (var company in prices.GroupBy(x => x.Company))
            {
                var companyItem = new CompanyItem
                {
                    Id = company.Key.Id,
                    Name = company.Key.Name,
                    Location = matrix.FirstOrDefault(x=>x.CompanyId == company.Key.Id)?.Location,
                    Distance = matrix.FirstOrDefault(x=>x.CompanyId == company.Key.Id)?.Distance,
                };

                foreach (var price in company)
                {
                    var service = price.Service;
                    var serviceItem = new ServiceItem
                    {
                        Id = service.Id,
                        Name = service.Name,
                        Code = service.GetCode(),
                        Amount = price.Amount,
                        IsNhi = price.IsNhi ?? false
                    };

                    companyItem.Services.Add(serviceItem);
                }

                Companies.Add(companyItem);
            }

        }

        public List<CompanyItem> Companies { get; set; }
    }

    public class CompanyItem
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public List<ServiceItem> Services { get; set; } = new List<ServiceItem>();
        public double? Distance { get; set; }
        public Location Location { get; set; }
    }

    public class ServiceItem
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public object Code { get; set; }
        public decimal Amount { get; set; }
        public bool IsNhi { get; set; }
    }
}
