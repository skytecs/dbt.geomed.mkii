using Dbt.Geomed.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dbt.Geomed.ViewModels
{
    public class CompanyViewModel
    {
        public CompanyViewModel()
        {
            
        }
        public CompanyViewModel(Company entity)
        {
            Id = entity.Id;
            Name = entity.Name;
            Address = entity.Address;
            Lat = entity.Lat;
            Lng = entity.Lng;

        }

        public long Id { get; set; }
        public long UserId { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public double Lng { get; set; }
        public double Lat { get; set; }

    }
}
