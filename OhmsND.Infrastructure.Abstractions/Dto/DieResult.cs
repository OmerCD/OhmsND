namespace OhmsND.Infrastructure.Abstractions.Dto
{
    public class DieResult
    {
        public int Value { get; set; }
        public DieStatus DieStatus { get; set; }
        public DieType DieType { get; set; }
    }

    public enum DieStatus
    {
        Failed, Neutral, Success
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


}