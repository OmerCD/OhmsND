using System.Collections.Generic;

namespace OhmsND.Domain.Queries
{
    public record BaseDndApiResponse
    {
        public int Count { get; set; }

        public IEnumerable<BaseDndApiResponseItem> Results { get; set; }

        public record BaseDndApiResponseItem
        {
            public string Index { get; set; }

            public string Name { get; set; }

            public string Url { get; set; }
        }
    }
}