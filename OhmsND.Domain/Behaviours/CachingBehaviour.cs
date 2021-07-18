using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.Extensions.Caching.Memory;
using OhmsND.Infrastructure.Abstractions.Caching;

namespace OhmsND.Domain.Behaviours
{
    public class CachingBehaviour<TRequest, TResponse>: IPipelineBehavior<TRequest, TResponse> where TRequest : ICacheable
    {
        private readonly IMemoryCache _memoryCache;

        public CachingBehaviour(IMemoryCache memoryCache)
        {
            _memoryCache = memoryCache;
        }

        public async Task<TResponse> Handle(TRequest request, CancellationToken cancellationToken, RequestHandlerDelegate<TResponse> next)
        {
            if (_memoryCache.TryGetValue(request.CacheKey, out TResponse response ))
            {
                return response;
            }

            response = await next();
            _memoryCache.Set(request.CacheKey, response, TimeSpan.FromDays(1));
            return response;
        }
    }
}