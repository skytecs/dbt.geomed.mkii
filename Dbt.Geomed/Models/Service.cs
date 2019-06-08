using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Dbt.Geomed.Models
{
    public class Service : Entity
    {
        public string Name { get; set; }

        [ForeignKey("Category")]
        public long? CategoryId { get; set; }
        public virtual Category Category { get; set; }

        public string ServiceClass { get; set; }
        public string Part { get; set; }
        public string Subpart { get; set; }
        public string Group { get; set; }
        public string Subgroup { get; set; }

        public string GetCode()
        {
            var code = $"{ServiceClass}{Part}.{Subpart}.{Group}";
            if(!String.IsNullOrEmpty(Subgroup))
            {
                code = $"{code}.{Subgroup}";
            }

            return code;
        }
    }
}
