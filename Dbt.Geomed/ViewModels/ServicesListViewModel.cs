using System.Collections.Generic;

namespace Dbt.Geomed.ViewModels
{
    public class ServicesListViewModel
    {
        public List<long> ServiceIds { get; set; }
        public double? Lng { get; set; }
        public double? Lat { get; set; }

        public bool IsNhi { get; set; }

        /// <summary>
        /// Только омс
        /// </summary>
        public bool RestrictToFree { get; set; }
        /// <summary>
        /// Только 
        /// </summary>
        public bool RestrictToCommercial { get; set; }
    }
}
