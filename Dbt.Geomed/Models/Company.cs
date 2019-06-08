using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Dbt.Geomed.Models
{
    public class Company : Entity
    {
        public string Name { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }


        public double Lng { get; set; }
        public double Lat { get; set; }

        [ForeignKey("User")]
        public long? UserId { get; set; }
        public virtual User User { get; set; }

        public bool HasLocation()
        {
            return Lng != 0.0 || Lat != 0.0;

        }


    }
}
