using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dbt.Geomed.Models
{
    public class Service : Entity
    {
        public string Name { get; set; }

        public string ServiceClass { get; set; }
        public string Part { get; set; }
        public string Subpart { get; set; }
        public string Group { get; set; }
        public string Subgroup { get; set; }
    }
}
