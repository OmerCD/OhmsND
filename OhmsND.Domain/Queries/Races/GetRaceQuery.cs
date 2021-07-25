using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Newtonsoft.Json;
using OhmsND.Core.Constants;
using OhmsND.Infrastructure.Abstractions.Services;

namespace OhmsND.Domain.Queries.Races
{
    public record GetRaceQuery(string RaceName) : ICacheableRequest<RaceInfo>
    {
        public string CacheKey => $"races/{RaceName}";
    }
    public class GetRaceQueryHandler : IRequestHandler<GetRaceQuery, RaceInfo>
    {
        private readonly IDndInfoService _dndInfoService;

        public GetRaceQueryHandler(IDndInfoService dndInfoService)
        {
            _dndInfoService = dndInfoService;
        }

        public async Task<RaceInfo> Handle(GetRaceQuery request, CancellationToken cancellationToken)
        {
            var result = await _dndInfoService.GetAs<RaceInfo>($"{DndApiCategories.Races}/{request.RaceName}", cancellationToken);
            return result;
        }
    }

    // Root myDeserializedClass = JsonConvert.DeserializeObject<Root>(myJsonResponse); 
    public class AbilityScore
    {
        [JsonProperty("index")]
        public string Index { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("url")]
        public string Url { get; set; }
    }

    public class AbilityBonus
    {
        [JsonProperty("ability_score")]
        public AbilityScore AbilityScore { get; set; }

        [JsonProperty("bonus")]
        public int Bonus { get; set; }
    }

    public class Language
    {
        [JsonProperty("index")]
        public string Index { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("url")]
        public string Url { get; set; }
    }

    public class From
    {
        [JsonProperty("index")]
        public string Index { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("url")]
        public string Url { get; set; }
    }

    public class LanguageOptions
    {
        [JsonProperty("choose")]
        public int Choose { get; set; }

        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("from")]
        public List<From> From { get; set; }
    }

    public class RaceInfo
    {
        [JsonProperty("index")]
        public string Index { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("speed")]
        public int Speed { get; set; }

        [JsonProperty("ability_bonuses")]
        public List<AbilityBonus> AbilityBonuses { get; set; }

        [JsonProperty("age")]
        public string Age { get; set; }

        [JsonProperty("alignment")]
        public string Alignment { get; set; }

        [JsonProperty("size")]
        public string Size { get; set; }

        [JsonProperty("size_description")]
        public string SizeDescription { get; set; }

        [JsonProperty("starting_proficiencies")]
        public List<object> StartingProficiencies { get; set; }

        [JsonProperty("languages")]
        public List<Language> Languages { get; set; }

        [JsonProperty("language_options")]
        public LanguageOptions LanguageOptions { get; set; }

        [JsonProperty("language_desc")]
        public string LanguageDesc { get; set; }

        [JsonProperty("traits")]
        public List<object> Traits { get; set; }

        [JsonProperty("subraces")]
        public List<object> Subraces { get; set; }

        [JsonProperty("url")]
        public string Url { get; set; }
    }


}