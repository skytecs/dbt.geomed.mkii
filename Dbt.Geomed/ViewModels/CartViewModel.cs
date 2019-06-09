using System.Collections.Generic;

namespace Dbt.Geomed.ViewModels
{
    public class CartViewModel
    {
        public List<ServiceItem> ServiceItems { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
    }
}