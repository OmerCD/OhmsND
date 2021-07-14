using OhmsND.Infrastructure.Abstractions.Dto;
using OhmsND.Infrastructure.Services;

namespace OhmsND.Infrastructure.Extensions
{
    public static class RollExtensions
    {
        public static DieStatus GetDieStatus(this int result, DieType dieType)
        {
            if (result == 1)
                return DieStatus.Failed;
            return result == (int) dieType ? DieStatus.Success : DieStatus.Neutral;
        }
    }
}