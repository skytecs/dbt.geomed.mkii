using Dbt.Geomed.Models;
using Dbt.Geomed.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dbt.Geomed.Controllers
{
    public class GeoController : Controller
    {
        private IGeoService _geoService;
        private IDataContext _dataContext;
        public GeoController(IGeoService geoService, IDataContext dataContext)
        {
            _geoService = geoService;
            _dataContext = dataContext ?? throw new System.ArgumentNullException(nameof(dataContext));
        }
        // GET
        public async Task<IActionResult> Address(double lat, double lng)
        {
            var address = await _geoService.GetAddress(new Location { Lat = lat, Lng = lng });

            return address == null ? (IActionResult)NotFound("Geocoding API error") : Ok(address);

        }
        // GET
        public async Task<IActionResult> Location(string address)
        {
            var location = await _geoService.GetLocation(address);

            return location == null ? (IActionResult)NotFound("Geocoding API error") : Ok(location);

        }
        [HttpGet]
        public async Task<IActionResult> Map(MapModel model)
        {
            var markers = _dataContext.Companies.Where(x => model.Companies.Contains(x.Id)).Where(x => x.HasLocation()).Select(x => new Location { Lat = x.Lat, Lng = x.Lng }).ToList();
            var map = await _geoService.GetPicture(new Location { Lat = model.Lat, Lng = model.Lng }, markers);

            return File(map, "image/png");

            //return (IActionResult) Ok("data:image/png;base64," + Convert.ToBase64String(map));

        }

        public class MapModel
        {
            public double Lat { get; set; }
            public double Lng { get; set; }
            public List<long> Companies { get; set; }
        }
    }
}