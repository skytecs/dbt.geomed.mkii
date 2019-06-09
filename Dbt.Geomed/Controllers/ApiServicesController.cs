﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dbt.Geomed.Models;
using Dbt.Geomed.Services;
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
        private readonly IGeoService _service;

        public ApiServicesController(IDataContext dataContext, ILogger<ApiServicesController> logger, IGeoService service)
        {
            _dataContext = dataContext ?? throw new System.ArgumentNullException(nameof(dataContext));
            _logger = logger ?? throw new System.ArgumentNullException(nameof(logger));
            _service = service ?? throw new ArgumentNullException(nameof(service));
        }

        [HttpPost]
        [Route("api/services")]
        [Produces(typeof(PricesViewModel))]
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

                return Ok(new PricesViewModel(prices, new List<CompanyDistance>()));
            }
            catch (Exception e)
            {
                _logger.LogError(e, e.Message);

                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        [Route("api/services")]
        [Produces(typeof(PricesViewModel))]
        public async Task<IActionResult> GetServicesList(ServicesListViewModel model)
        {
            try
            {


                var prices = _dataContext.Prices
                    .Include(x => x.Service)
                    .Include(x => x.Company)
                    .Where(x => model.ServiceIds.Contains(x.ServiceId))
                    .AsNoTracking()
                    .ToList();

                List<CompanyDistance> matrix = new List<CompanyDistance>();
                if (model.Lat.HasValue && model.Lng.HasValue)
                {
                    matrix = await _service.GetDistanceMatrix( new Location { Lng = model.Lng.Value, Lat = model.Lat.Value },
                        prices.Select(x => x.Company).Distinct().ToList());

                }

                return Ok(new PricesViewModel(prices, matrix));
            }
            catch (Exception e)
            {
                _logger.LogError(e, e.Message);

                return BadRequest(e.Message);
            }
        }


        [HttpGet]
        [Route("api/categories")]
        [Produces(typeof(CategoriesListViewModel))]
        public async Task<IActionResult> GetCategoriesList()
        {
            try
            {
                var categories = await _dataContext.Services
                    .Include(x => x.Category)
                    .Where(x => x.Category != null)
                    .AsNoTracking()
                    .ToListAsync();

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
