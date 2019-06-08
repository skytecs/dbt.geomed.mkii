using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dbt.Geomed.Models
{
    public class User : Entity
    {
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Middlename { get; set; }
        public string Password { get; internal set; }
        public string Email { get; internal set; }
    }
}
