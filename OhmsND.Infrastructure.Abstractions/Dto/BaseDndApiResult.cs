using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace OhmsND.Infrastructure.Abstractions.Dto
{

    public class Item
    {
        [JsonPropertyName("index")]
        public string Index { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("url")]
        public string Url { get; set; }
    }

    public class BaseDndApiResult
    {
        [JsonPropertyName("count")]
        public int Count { get; set; }

        [JsonPropertyName("results")]
        public List<Item> Results { get; set; }
    }

}