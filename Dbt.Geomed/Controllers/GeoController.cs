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
        public async Task<IActionResult> Address(double lat, double lng)
        {
            var address = await _geoService.GetAddress(new Location {Lat = lat, Lng = lng});
            
            return  address == null ? (IActionResult) NotFound("Geocoding API error") : Ok(address);
            
        }
        // GET
        public async Task<IActionResult> Location(string address)
        {
            var location = await _geoService.GetLocation(address);
            
            return  location == null ? (IActionResult) NotFound("Geocoding API error") : Ok(location);
            
        }
    }
}