using System.Threading.Tasks;
using AutoMapper;
using DataAccess;
using DataContracts;
using DataContracts.Base;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Repositories;
using Repositories.Base;
using Services.Mappings;

namespace Services
{
    public static class Registry
    {
        public static IServiceCollection AddServices(IServiceCollection services)
        {
            services.AddTransient<IProductRepository, ProductRepository>();
            services.AddTransient<IUnitOfWork, UnitOfWork>();
            services.AddDbContext<DatabaseContext>(options =>
                options.UseSqlServer("Data Source=localhost\\MSSQLSERVER01;Initial Catalog=TaskDatabase;Integrated Security=True"));

            services.AddAutoMapper(x => x.AddProfile(new MappingConfig()));
            return services;
        }
    }
}