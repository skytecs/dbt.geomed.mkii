using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Dbt.Geomed.Models
{
    public class Price : Entity
    {
        [ForeignKey("Company")]
        public long CompanyId { get; set; }
        public virtual Company Company { get; set; }

        [ForeignKey("Service")]
        public long ServiceId { get; set; }
        public virtual Service Service { get; set; }

        public decimal Amount { get; set; }
    }
}
