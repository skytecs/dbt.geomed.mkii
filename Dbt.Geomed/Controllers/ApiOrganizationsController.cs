using Dbt.Geomed.Models;
using Dbt.Geomed.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Dbt.Geomed.Services;
using Microsoft.Extensions.Logging;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Dbt.Geomed.Controllers
{
    public class ApiOrganizationsController : Controller
    {
        private IGeoService _geoService;
        private readonly IDataContext _dataContext;
        private readonly ILogger _logger;

        public ApiOrganizationsController(IDataContext dataContext, ILogger<ApiOrganizationsController> logger, IGeoService service)
        {
            _dataContext = dataContext;
            _logger = logger;
            _geoService = service;
        }

        [HttpGet]
        [Route("api/organizations")]
        public IActionResult GetOrganizations()
        {
            var companies = _dataContext.Companies.Select(x => new CompanyViewModel(x)).ToList();
            return Ok(companies);
        }

        [HttpGet]
        [Route("api/organizations/{id}")]
        public IActionResult GetOrganization(long id)
        {
            var model = _dataContext.Companies.Where(x => x.Id == id).Select(x => new CompanyViewModel(x)).FirstOrDefault();
            if (model == null)
            {
                _logger.Log(LogLevel.Error ,$"Company '{id}' was not found.");
                return NotFound(nameof(model));
            }

            var location = _geoService.GetLocation(model.Address).Result;
            model.Lng = location.Lng;
            model.Lat = location.Lat;
            _dataContext.SaveChangesAsync();
            return Ok(model);
        }
    }
}
