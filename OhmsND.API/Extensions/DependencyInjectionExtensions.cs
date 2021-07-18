using Mapster;
using MapsterMapper;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
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

        public static IServiceCollection AddIdentityServerAuthentication(this IServiceCollection services)
        {
            services.AddAuthentication("Bearer")
                .AddJwtBearer("Bearer", options =>
                {
                    options.Authority = "https://localhost:3682";

                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateAudience = false
                    };
                });

            return services;
        }
    }
}