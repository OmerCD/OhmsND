using Mapster;
using MapsterMapper;
using Microsoft.Extensions.DependencyInjection;
using OhmsND.Infrastructure.Mappings;

namespace OhmsND.API.Extensions
{
    public static class DependencyInjectionExtensions
    {
        public static IServiceCollection AddMapster(this IServiceCollection services)
        {
            var config = new TypeAdapterConfig();
            config.Scan(typeof(Startup).Assembly, typeof(CharacterMapping).Assembly);
            services.AddScoped<IMapper>(provider => new Mapper(config));
            return services;
        }
    }
}