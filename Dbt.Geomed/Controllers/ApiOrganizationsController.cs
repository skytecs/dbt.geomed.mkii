using Dbt.Geomed.Models;
using Dbt.Geomed.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Linq;


// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Dbt.Geomed.Controllers
{
    public class ApiOrganizationsController : Controller
    {
        private readonly IDataContext _dataContext;
        private readonly ILogger<ApiOrganizationsController> _logger;

        public ApiOrganizationsController(IDataContext dataContext, ILogger<ApiOrganizationsController> logger)
        {
            _dataContext = dataContext ?? throw new System.ArgumentNullException(nameof(dataContext));
            _logger = logger ?? throw new System.ArgumentNullException(nameof(logger));
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
                _logger.LogError($"Company '{id}' was not found.");
                return NotFound(nameof(model));
            }

            return Ok(model);
        }


    }
}
