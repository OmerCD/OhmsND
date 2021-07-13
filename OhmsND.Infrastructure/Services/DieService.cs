using System;
using System.Collections.Generic;
using System.Linq;
using static OhmsND.Infrastructure.Services.DieType;

namespace OhmsND.Infrastructure.Services
{
    public class DieService
    {
        public int Roll(int dieCount, DieType dieType)
        {
            var random = new Random();
            var result = Enumerable.Range(0, dieCount).Select(x=> random.Next(1,(int)dieType + 1));
            return result.Sum();
        }
        public IEnumerable<int> RollWithResults(int dieCount, DieType dieType)
        {
            var random = new Random();
            var result = Enumerable.Range(0, dieCount).Select(x=> random.Next(1,(int)dieType + 1));
            return result;
        }
    }

    public enum DieType
    {
        D2 = 2,
        D4 = 4,
        D6 = 6,
        D8 = 8,
        D100 = 100,
        D10 = 10,
        D12 = 12,
        D20 = 20
    }

    public static class DieFacade
    {
    
        private static readonly DieService DieService = new DieService();
        public static int GetCharacterAttributeDieResult()
        {
            return DieService.Roll(2, D6) + 6;
        }
    }
}