using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dbt.Geomed.Models;
using Dbt.Geomed.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using NLog;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Dbt.Geomed.Controllers
{
    public class ApiServicesController : Controller
    {
        private readonly IDataContext _dataContext;
        private readonly ILogger<ApiServicesController> _logger;

        public ApiServicesController(IDataContext dataContext, ILogger<ApiServicesController> logger)
        {
            _dataContext = dataContext ?? throw new System.ArgumentNullException(nameof(dataContext));
            _logger = logger ?? throw new System.ArgumentNullException(nameof(logger));
        }

        [HttpPost]
        [Route("api/services")]
        public IActionResult GetCompanyServicesInfo(ServicesListViewModel model)
        {
            try
            {
                var prices = _dataContext.Prices
                    .Include(x => x.Service)
                    .Include(x => x.Company)
                    .Where(x => model.ServiceIds.Contains(x.ServiceId))
                    .AsNoTracking()
                    .ToList();

                return Ok(new PricesViewModel(prices));
            }
            catch (Exception e)
            {
                _logger.LogError(e, e.Message);

                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        [Route("api/services")]
        public IActionResult GetServicesList(ServicesListViewModel model)
        {
            try
            {
                var prices = _dataContext.Prices
                    .Include(x => x.Service)
                    .Include(x => x.Company)
                    .Where(x => model.ServiceIds.Contains(x.ServiceId))
                    .AsNoTracking()
                    .ToList();

                return Ok(new PricesViewModel(prices));
            }
            catch (Exception e)
            {
                _logger.LogError(e, e.Message);

                return BadRequest(e.Message);
            }
        }


        [HttpGet]
        [Route("api/categories")]
        public IActionResult GetCagorieList()
        {
            try
            {
                var categories = _dataContext.Services
                    .Include(x => x.Category)
                    .Where(x => x.Category != null)
                    .AsNoTracking()
                    .ToList();

                return Ok(new CategoriesListViewModel(categories));
            }
            catch (Exception e)
            {
                _logger.LogError(e, e.Message);

                return BadRequest(e.Message);
            }
        }


    }
}
