using System.Collections.Generic;

namespace OhmsND.Models.Request.Die
{
    public class DieRollRequestModel
    {
        public IEnumerable<DieRollRequestItemModel> Dice { get; set; }
    }
    public class DieRollRequestItemModel
    {
        public int Count { get; set; }
        public DieType DieType { get; set; }
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