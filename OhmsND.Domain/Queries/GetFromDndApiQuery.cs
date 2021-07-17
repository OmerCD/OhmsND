using System.Threading;
using System.Threading.Tasks;
using MapsterMapper;
using MediatR;
using OhmsND.Infrastructure.Abstractions.Services;

namespace OhmsND.Domain.Queries
{
    public record GetFromDndApiQuery(string TypeName) : ICacheableRequest<BaseDndApiResponse>
    {
        public string CacheKey => TypeName;
    }

    public class GetFromDndApiQueryHandler : IRequestHandler<GetFromDndApiQuery, BaseDndApiResponse>
    {
        private readonly IDndInfoService _dndInfoService;
        private readonly IMapper _mapper;

        public GetFromDndApiQueryHandler(IDndInfoService dndInfoService, IMapper mapper)
        {
            _dndInfoService = dndInfoService;
            _mapper = mapper;
        }

        public async Task<BaseDndApiResponse> Handle(GetFromDndApiQuery request, CancellationToken cancellationToken)
        {
            var allClasses = await _dndInfoService.GetAll(request.TypeName, cancellationToken);
            return _mapper.Map<BaseDndApiResponse>(allClasses);
        }
    }
}