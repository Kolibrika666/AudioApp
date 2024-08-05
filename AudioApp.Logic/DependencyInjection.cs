using AudioApp.Logic.Contracts;
using AudioApp.Logic.Impl;
using Microsoft.Extensions.DependencyInjection;

namespace AudioApp.Logic
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddLogic(this IServiceCollection services)
        {
            services.AddScoped<IMigrateService, MigrateService>();
            services.AddTransient<IUserService, UserService>();
            return services;
        }
    }
}
