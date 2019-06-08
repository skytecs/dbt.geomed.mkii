using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using RestSharp;

namespace Dbt.Geomed.Services
{
    public class GoogleGeoService : IGeoService
    {
        private IOptions<GeoServiceSettings> _settings;

        public GoogleGeoService(IOptions<GeoServiceSettings> settings)
        {
            _settings = settings;
        }
        
        NumberFormatInfo _nfi = new NumberFormatInfo
        {
            NumberDecimalSeparator = "."
        };

        public async Task<string> GetAddress(Location location)
        {
            var locString = $"{location.Lat.ToString("00.000", _nfi)},{location.Lng.ToString("00.000", _nfi)}";

            var url = $"https://maps.googleapis.com/maps/api/geocode/json?key={GetKey()}&language=ru&latlng={locString}";
            var client = new RestClient(url);
            var request = new RestRequest();
            var response = await client.ExecuteGetTaskAsync<GoogleData>(request);

            return response.Data.Status != "OK" ? "Geocoding API error" : response.Data.Results.FirstOrDefault()?.FormattedAddress;
        }

        public string GetKey()
        {
            return _settings.Value.ApiKey;
        }
    }
}