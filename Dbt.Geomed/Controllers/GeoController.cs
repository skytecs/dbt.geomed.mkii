using System.Threading.Tasks;
using Dbt.Geomed.Services;
using Microsoft.AspNetCore.Mvc;

namespace Dbt.Geomed.Controllers
{
    public class GeoController : Controller
    {
        private IGeoService _geoService;
        public GeoController(IGeoService geoService)
        {
            _geoService = geoService;
        }
        // GET
        public async Task<string> Map(double lat, double lng)
        {
            return await _geoService.GetAddress(new Location{ Lat = lat, Lng = lng });
        }
    }
}