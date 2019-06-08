using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Dbt.Geomed.Models;
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
            var response = await client.ExecuteGetTaskAsync<GoogleGeocodeResult>(request);

            return response.Data.Status != "OK" ? null : response.Data.Results.FirstOrDefault()?.FormattedAddress;
        }

        public async Task<Location> GetLocation(string address)
        {
            var url = $"https://maps.googleapis.com/maps/api/geocode/json?address={address}&key={GetKey()}&language=ru";

            var client = new RestClient(url);
            var request = new RestRequest();
            request.AddHeader("Connection", "keep-alive");
            request.AddHeader("Accept-Encoding", "gzip, deflate");
            request.AddHeader("Cache-Control", "no-cache");
            request.AddHeader("Accept", "*/*");
            var response = await client.ExecuteTaskAsync<GoogleGeocodeResult>(request);

            return response.Data.Results.FirstOrDefault()?.Geometry?.Location;
        }

        public async Task<GoogleDistanceMatrixResult> GetDistanceMatrix(Location location, List<Company> companies)
        {
           var originsString = $"{location.Lat.ToString("00.000", _nfi)},{location.Lng.ToString("00.000", _nfi)}";
           var destinationsString = "";
            foreach (var company in companies)
            {
                destinationsString += $"{company.Lat.ToString("00.000", _nfi)},{location.Lng.ToString("00.000", _nfi)}|";
            }

            var url = $"https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins={originsString}&destinations={destinationsString}&key={GetKey()}";
            var client = new RestClient(url);
            var request = new RestRequest();
            var response = await client.ExecuteGetTaskAsync<GoogleDistanceMatrixResult>(request);
            return response.Data.Status != "OK" ? null : response.Data;
        }

        public string GetKey()
        {
            return _settings.Value.ApiKey;
        }
    }
}