using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dbt.Geomed.Models;
using Newtonsoft.Json;

namespace Dbt.Geomed.Services
{

    public interface IGeoService
    {
        Task<string> GetAddress(Location location);
        Task<Location> GetLocation(string address);
        Task<List<CompanyDistance>> GetDistanceMatrix(Location location, List<Company> companies);
    }

    public class PlusCode
    {

        [JsonProperty("compound_code")]
        public string CompoundCode { get; set; }

        [JsonProperty("global_code")]
        public string GlobalCode { get; set; }
    }

    public class AddressComponent
    {

        [JsonProperty("long_name")]
        public string LongName { get; set; }

        [JsonProperty("short_name")]
        public string ShortName { get; set; }

        [JsonProperty("types")]
        public IList<string> Types { get; set; }
    }

    public class Location
    {

        [JsonProperty("lat")]
        public double Lat { get; set; }

        [JsonProperty("lng")]
        public double Lng { get; set; }
    }

    public class Northeast
    {

        [JsonProperty("lat")]
        public double Lat { get; set; }

        [JsonProperty("lng")]
        public double Lng { get; set; }
    }

    public class Southwest
    {

        [JsonProperty("lat")]
        public double Lat { get; set; }

        [JsonProperty("lng")]
        public double Lng { get; set; }
    }

    public class Viewport
    {

        [JsonProperty("northeast")]
        public Northeast Northeast { get; set; }

        [JsonProperty("southwest")]
        public Southwest Southwest { get; set; }
    }

    public class Bounds
    {

        [JsonProperty("northeast")]
        public Northeast Northeast { get; set; }

        [JsonProperty("southwest")]
        public Southwest Southwest { get; set; }
    }

    public class Geometry
    {

        [JsonProperty("location")]
        public Location Location { get; set; }

        [JsonProperty("location_type")]
        public string LocationType { get; set; }

        [JsonProperty("viewport")]
        public Viewport Viewport { get; set; }

        [JsonProperty("bounds")]
        public Bounds Bounds { get; set; }
    }

    public class Result
    {

        [JsonProperty("address_components")]
        public IList<AddressComponent> AddressComponents { get; set; }

        [JsonProperty("formatted_address")]
        public string FormattedAddress { get; set; }

        [JsonProperty("geometry")]
        public Geometry Geometry { get; set; }

        [JsonProperty("place_id")]
        public string PlaceId { get; set; }

        [JsonProperty("plus_code")]
        public PlusCode PlusCode { get; set; }

        [JsonProperty("types")]
        public IList<string> Types { get; set; }
    }

    public class GoogleGeocodeResult
    {

        [JsonProperty("plus_code")]
        public PlusCode PlusCode { get; set; }

        [JsonProperty("results")]
        public IList<Result> Results { get; set; }

        [JsonProperty("status")]
        public string Status { get; set; }
    }

    public class Distance
    {

        [JsonProperty("text")]
        public string Text { get; set; }

        [JsonProperty("value")]
        public int Value { get; set; }
    }

    public class Duration
    {

        [JsonProperty("text")]
        public string Text { get; set; }

        [JsonProperty("value")]
        public int Value { get; set; }
    }

    public class Element
    {

        [JsonProperty("distance")]
        public Distance Distance { get; set; }

        [JsonProperty("duration")]
        public Duration Duration { get; set; }

        [JsonProperty("status")]
        public string Status { get; set; }
    }

    public class Row
    {

        [JsonProperty("elements")]
        public IList<Element> Elements { get; set; }
    }

    public class GoogleDistanceMatrixResult
    {

        [JsonProperty("destination_addresses")]
        public IList<string> DestinationAddresses { get; set; }

        [JsonProperty("origin_addresses")]
        public IList<string> OriginAddresses { get; set; }

        [JsonProperty("rows")]
        public IList<Row> Rows { get; set; }

        [JsonProperty("status")]
        public string Status { get; set; }
    }
}
