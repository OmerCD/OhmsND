using System.Collections.Generic;
using Newtonsoft.Json;

namespace OhmsND.Infrastructure.Abstractions.Dto
{
    public class Class
    {
        [JsonProperty("index")]
        public string Index { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("url")]
        public string Url { get; set; }
    }

    public class ClassInfoDto
    {
        [JsonProperty("count")]
        public int Count { get; set; }

        [JsonProperty("results")]
        public List<Class> Results { get; set; }
    }
}