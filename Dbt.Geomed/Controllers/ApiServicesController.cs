using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dbt.Geomed.Models;
using Microsoft.AspNetCore.Mvc;
using NLog;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Dbt.Geomed.Controllers
{
    public class ApiServicesController : Controller
    {
        private readonly IDataContext _dataContext;
        private readonly ILogger _logger;

        public ApiServicesController(IDataContext dataContext, ILogger logger)
        {
            _dataContext = dataContext;
            _logger = logger;
        }

        [HttpPost]
        [Route("api/services")]
        public IActionResult GetCompanyServicesInfo(ServicesListViewModel model)
        {

        }
    }
}
