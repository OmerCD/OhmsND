using System.Collections.Generic;

namespace OhmsND.Infrastructure.Abstractions.Dto
{
    public class RollResult
    {
        public IEnumerable<DieResult> DieResults { get; set; }
        public int Value { get; set; }
        public RollStatus RollStatus { get; set; }
        public DieType DieType { get; set; }
    }
    public enum RollStatus
    {
        Failed, Neutral, Success
    }
}