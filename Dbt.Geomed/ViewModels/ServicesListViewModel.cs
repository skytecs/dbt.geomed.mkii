﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dbt.Geomed.ViewModels
{
    public class ServicesListViewModel
    {
        public List<long> ServiceIds { get; set; } 
        public double? Lng { get; set; }
        public double? Lat { get; set; }
    }
}
