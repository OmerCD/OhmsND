using System;
using System.Collections.Generic;
using System.Linq;
using OhmsND.Infrastructure.Abstractions.Dto;
using OhmsND.Infrastructure.Abstractions.Services;
using OhmsND.Infrastructure.Extensions;
using static OhmsND.Infrastructure.Abstractions.Dto.DieType;

namespace OhmsND.Infrastructure.Services
{
    public class DieService : IDieService
    {
        public DieResult Roll(int dieCount, DieType dieType)
        {
            var random = new Random();
            var result = Enumerable.Range(0, dieCount).Select(x=> random.Next(1,(int)dieType + 1));
            var sum = result.Sum();
            return new DieResult()
            {
                Value = sum,
                DieStatus = DieStatus.Neutral
            };
        }
        public RollResult RollWithResults(int dieCount, DieType dieType)
        {
            var random = new Random();
            var result = Enumerable.Range(0, dieCount).Select(x=> random.Next(1,(int)dieType + 1)).ToArray();
            return new RollResult()
            {
                DieResults = result.Select(x => new DieResult
                {
                    Value = x, DieStatus = x.GetDieStatus(dieType)
                }),
                Value = result.Sum(),
                RollStatus = RollStatus.Neutral // TODO
            };
        }
    }


    public static class DieFacade
    {
    
        private static readonly DieService DieService = new DieService();
        public static int GetCharacterAttributeDieResult()
        {
            return DieService.Roll(2, D6).Value + 6;
        }
    }
}