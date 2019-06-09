using Dbt.Geomed.Models;
using Dbt.Geomed.Services;
using Dbt.Geomed.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
                var query = _dataContext.Prices
                    .Include(x => x.Service)
                    .Include(x => x.Company)
                    .Where(x => model.ServiceIds.Contains(x.ServiceId))
                    .AsNoTracking();

                var prices = query.ToList();

                List<CompanyDistance> matrix = new List<CompanyDistance>();
                if (model.Lat.HasValue && model.Lng.HasValue)
                {
                    matrix = await _service.GetDistanceMatrix(new Location { Lng = model.Lng.Value, Lat = model.Lat.Value },
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

        [HttpGet("/api/services/suggestions")]
        [Produces(typeof(CategoryServiceItem[]))]
        public async Task<IActionResult> GetServicesForSuggestions(List<long> id)
        {
            var services = await _dataContext.Services
                .Where(x => id.Contains(x.Id))
                .Select(x => new CategoryServiceItem
                {
                    Id = x.Id,
                    Name = x.Name
                })
                .ToListAsync();

            return Ok(services);
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

        [HttpGet]
        [Route("api/cartprices")]
        [Produces(typeof(CartPricesViewModel))]
        public async Task<IActionResult> GetCartPrices(List<long> priceIds)
        {
            try
            {
                var prices = await _dataContext.Prices
                    .Include(x => x.Service)
                    .Include(x => x.Company)
                    .Where(x => priceIds.Contains(x.Id))
                    .AsNoTracking()
                    .ToListAsync();

                return Ok(new CartPricesViewModel(prices));
            }
            catch (Exception e)
            {
                _logger.LogError(e, e.Message);

                return BadRequest(e.Message);
            }
        }

        public class CartPricesViewModel
        {
            public List<CartPrice> Prices { get; set; }

            public CartPricesViewModel(List<Price> prices)
            {
                Prices = prices.Select(x => new CartPrice
                {
                    Name = x.Service.Name,
                    Amount = x.Amount,
                    Company = x.Company.Name,
                    IsNhi = x.IsNhi,
                    Address = x.Company.Address
                }).ToList();
            }

            public class CartPrice
            {
                public long Id { get; set; }
                public string Name { get; set; }
                public decimal Amount { get; set; }
                public bool? IsNhi { get; set; }
                public string Company { get; set; }
                public string Address { get; internal set; }
            }
        }
    }
}
