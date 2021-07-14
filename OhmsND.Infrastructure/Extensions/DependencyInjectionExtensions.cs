using Microsoft.Extensions.DependencyInjection;
using OhmsND.Infrastructure.Abstractions.Services;
using OhmsND.Infrastructure.Services;

namespace OhmsND.Infrastructure.Extensions
{
    public static class DependencyInjectionExtensions
    {
        public static IServiceCollection AddServices(this IServiceCollection services)
        {
            services.Scan(scan => scan
                .FromAssemblyOf<IScopedService>().FromAssemblyOf<DieService>()
                .AddClasses(classes => classes.AssignableTo<IScopedService>())
                .AsImplementedInterfaces()
                .WithScopedLifetime());
            return services;
        }
    }
}