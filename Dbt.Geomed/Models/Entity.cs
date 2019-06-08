using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Dbt.Geomed.Models
{
    public class Entity
    {
        [Key]
        public long Id { get; set; }
    }
}
