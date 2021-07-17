using System;
using System.Net.Http;
using Microsoft.Extensions.DependencyInjection;
using OhmsND.Infrastructure.Abstractions.Services;
using OhmsND.Infrastructure.Services;
using Polly;

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

        public static IServiceCollection AddDnd5eApi(this IServiceCollection services, string clientName = "dnd5eapi") // TODO Requires Caching
        {
            services.AddHttpClient(clientName,
                    client => { client.BaseAddress = new Uri("https://www.dnd5eapi.co/api/"); })
                .AddTransientHttpErrorPolicy(x => x.WaitAndRetryAsync(3, _ => TimeSpan.FromSeconds(2)));
            return services;
        }
    }
}