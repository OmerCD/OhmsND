namespace OhmsND.Infrastructure.Abstractions.Caching
{
    public interface ICacheable
    {
        public string CacheKey { get; }
    }
}