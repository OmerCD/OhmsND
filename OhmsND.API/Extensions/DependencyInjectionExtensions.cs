using Mapster;
using MapsterMapper;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using OhmsND.Domain.Beahaviours;
using OhmsND.Domain.Queries.Classes;
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

        public static IServiceCollection AddMediatRWithPipeline(this IServiceCollection services)
        {
            services.AddMediatR(typeof(GetAllClassesQuery));
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(CachingBehaviour<,>));
            return services;
        }
    }
}