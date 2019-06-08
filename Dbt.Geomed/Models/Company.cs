using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dbt.Geomed.Models
{
    public class Company : Entity
    {
        public string Name { get; set; }
        public string Address { get; set; }

        public double Lng { get; set; }
        public double Lat { get; set; }

        public bool HasLocation()
        {
            return Lng != 0.0 || Lat != 0.0;

        }


    }
}
