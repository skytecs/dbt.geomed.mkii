using System;
using Dbt.Geomed.Models;
using Dbt.Geomed.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Dbt.Geomed.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;


// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Dbt.Geomed.Controllers
{
    public class ApiOrganizationsController : Controller
    {
        private IGeoService _geoService;
        private readonly IDataContext _dataContext;
        private readonly ILogger<ApiOrganizationsController> _logger;

        public ApiOrganizationsController(IDataContext dataContext, ILogger<ApiOrganizationsController> logger, IGeoService service)
        {
            _dataContext = dataContext ?? throw new System.ArgumentNullException(nameof(dataContext));
            _logger = logger ?? throw new System.ArgumentNullException(nameof(logger));
            _geoService = service ?? throw new System.ArgumentNullException(nameof(service));
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
        public async Task<IActionResult> GetOrganization(long id)
        {
            var model = _dataContext.Companies.FirstOrDefault(x => x.Id == id);
            if (model == null)
            {
             _logger.LogError($"Company '{id}' was not found.");
              return NotFound(nameof(model));
            }

            var location = _geoService.GetLocation(model.Address).Result;
            model.Lng = location.Lng;
            model.Lat = location.Lat;
            var res = await _dataContext.SaveChangesAsync();
            return Ok(new CompanyViewModel(model));
        }
        
        [HttpGet]
        [Route("api/organizations/matrix")]
        public async Task<IActionResult> GetOrganization(double lat, double lng)
        {
            var models = _dataContext.Companies.Where(x=>x.HasLocation()).ToList();
            var result = await _geoService.GetDistanceMatrix(new Location {Lat = lat, Lng = lng}, models);
            return  result == null ? (IActionResult) NotFound("Geocoding API error") : Ok(result);
        }
        
        [HttpPost]
        [Authorize]
        [Route("api/organizations")]
        public async Task<IActionResult> CreateOrganization(CompanyViewModel model)
        {
            var userId = ClaimsPrincipal.Current.GetId();
            var storedModel = new Company {Name = model.Email, Address = model.Address, Email = model.Email, UserId = userId};
            var location = _geoService.GetLocation(model.Address).Result;
            if (location != null)
            {
                model.Lng = location.Lng;
                model.Lat = location.Lat;  
            }

            
            _dataContext.Companies.Add(storedModel);
            
            var updated = await _dataContext.SaveChangesAsync();
            return updated == 1? (IActionResult) Ok(storedModel) : BadRequest();
        }
        
        [HttpPut]
        [Authorize]
        [Route("api/organizations")]
        public async Task<IActionResult> UpdateOrganization(CompanyViewModel model)
        {

            var storedModel = _dataContext.Companies.FirstOrDefault(x => x.Id == model.UserId);
            if (storedModel == null)
            {
                return BadRequest();
            }
            
            storedModel.Name = model.Name;
            storedModel.Address = model.Address;
            storedModel.Email = model.Email;
            
            var updated = await _dataContext.SaveChangesAsync();
            return updated == 1? (IActionResult) Ok(storedModel) : BadRequest();
        }
    }
    
   
}
