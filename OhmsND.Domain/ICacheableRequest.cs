using MediatR;
using OhmsND.Infrastructure.Abstractions.Caching;

namespace OhmsND.Domain
{
    public interface ICacheableRequest<out T> : IRequest<T>, ICacheable{}
}