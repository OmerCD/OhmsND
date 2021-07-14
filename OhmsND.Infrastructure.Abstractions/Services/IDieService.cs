using OhmsND.Infrastructure.Abstractions.Dto;

namespace OhmsND.Infrastructure.Abstractions.Services
{
    public interface IDieService : IScopedService
    {
        DieResult Roll(int dieCount, DieType dieType);
        RollResult RollWithResults(int dieCount, DieType dieType);
    }
}