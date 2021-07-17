using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MapsterMapper;
using MediatR;
using OhmsND.Infrastructure.Abstractions.Services;

namespace OhmsND.Domain.Queries.Classes
{
    public record GetAllClassesQuery : ICacheableRequest<GetAllClassesQueryResponse>
    {
        public string CacheKey => "GetAllClasses";
    }

    public record GetAllClassesQueryResponse
    {
        public int Count { get; set; }

        public IEnumerable<GetAllClassesQueryResponseItem> Results { get; set; }

        public record GetAllClassesQueryResponseItem
        {
            public string Index { get; set; }

            public string Name { get; set; }

            public string Url { get; set; }
        }
    }
    
    public class GetAllClassesQueryHandler : IRequestHandler<GetAllClassesQuery,GetAllClassesQueryResponse>
    {
        private readonly IDndInfoService _dndInfoService;
        private readonly IMapper _mapper;

        public GetAllClassesQueryHandler(IDndInfoService dndInfoService, IMapper mapper)
        {
            _dndInfoService = dndInfoService;
            _mapper = mapper;
        }

        public async Task<GetAllClassesQueryResponse> Handle(GetAllClassesQuery request, CancellationToken cancellationToken)
        {
            var allClasses = await _dndInfoService.GetAllClasses(cancellationToken);
            return _mapper.Map<GetAllClassesQueryResponse>(allClasses);
        }
    }
}