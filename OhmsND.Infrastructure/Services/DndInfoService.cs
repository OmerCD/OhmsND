using System.Collections.Generic;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Newtonsoft.Json;
using OhmsND.Infrastructure.Abstractions.Dto;
using OhmsND.Infrastructure.Abstractions.Services;

namespace OhmsND.Infrastructure.Services
{
    public class DndInfoService : IDndInfoService
    {
        private readonly HttpClient _dndClient;

        public DndInfoService(IHttpClientFactory httpClientFactory)
        {
            _dndClient = httpClientFactory.CreateClient("dnd5eapi");
        }

        public async Task<ClassInfoDto> GetAllClasses(CancellationToken cancellationToken = default)
        {
            var response = await _dndClient.GetAsync("classes", cancellationToken);
            if (!response.IsSuccessStatusCode) return null;
            var stringContent = await response.Content.ReadAsStringAsync(cancellationToken);
            return JsonConvert.DeserializeObject<ClassInfoDto>(stringContent);

        }
    }
}