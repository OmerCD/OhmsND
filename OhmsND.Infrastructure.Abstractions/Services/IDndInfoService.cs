using System.Threading;
using System.Threading.Tasks;
using OhmsND.Infrastructure.Abstractions.Dto;

namespace OhmsND.Infrastructure.Abstractions.Services
{
    public interface IDndInfoService : IScopedService
    {
        Task<ClassInfoDto> GetAllClasses(CancellationToken cancellationToken = default);
        Task<BaseDndApiResult> GetAll(string typeName, CancellationToken cancellationToken = default);
    }
}