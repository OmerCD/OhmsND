using System.Collections.Generic;
using System.Linq;

namespace OhmsND.Core.Constants
{
    public static class DndClasses
    {
        public static DndClass Warlock { get; } = new()
        {
            Name = "Warlock",
            IndexName = "warlock",
            HitDie = 8
        };

        public static DndClass Barbarian { get; } = new()
        {
            Name = "Barbarian",
            IndexName = "barbarian",
            HitDie = 12
        };

        public static DndClass Bard { get; } = new()
        {
            Name = "Bard",
            IndexName = "bard",
            HitDie = 8
        };

        public static DndClass Rouge { get; } = new()
        {
            Name = "Rouge",
            IndexName = "rouge",
            HitDie = 8
        };

        public static DndClass Wizard { get; } = new()
        {
            Name = "Wizard",
            IndexName = "wizard",
            HitDie = 6
        };

        public static DndClass Monk { get; } = new()
        {
            Name = "Monk",
            IndexName = "monk",
            HitDie = 8
        };

        public static DndClass Cleric { get; } = new()
        {
            Name = "Cleric",
            IndexName = "cleric",
            HitDie = 8
        };

        public static DndClass Druid { get; } = new()
        {
            Name = "Druid",
            IndexName = "druid",
            HitDie = 8
        };

        public static DndClass Fighter { get; } = new()
        {
            Name = "Fighter",
            IndexName = "fighter",
            HitDie = 10
        };

        public static DndClass Paladin { get; } = new()
        {
            Name = "Paladin",
            IndexName = "paladin",
            HitDie = 10
        };

        public static DndClass Ranger { get; } = new()
        {
            Name = "Ranger",
            IndexName = "ranger",
            HitDie = 10
        };

        public static DndClass Sorcerer { get; } = new()
        {
            Name = "Sorcerer",
            IndexName = "sorcerer",
            HitDie = 6
        };

        public static IDictionary<string, DndClass> IndexToClasses;

        static DndClasses()
        {
            IndexToClasses = typeof(DndClasses).GetProperties()
                .ToDictionary(x => ((DndClass) (x.GetValue(null))).IndexName, info => (DndClass) info.GetValue(null));
        }

        private static readonly HashSet<string> SpecialClassesForAC = new()
        {
            "barbarian", "monk", "sorcerer"
        };
        public static int GetACModifier(Entities.Mongo.Attributes attributes, IEnumerable<string> classIndexNames)
        {
            var dndClasses = classIndexNames.Select(x=> IndexToClasses[x]).Where(x=> SpecialClassesForAC.Contains(x.IndexName));
            var sum = dndClasses.Select(x =>
            {
                return x.IndexName switch
                {
                    "barbarian" => attributes.Constitution.Modifier,
                    "monk" => attributes.Wisdom.Modifier,
                    "sorcerer" => 3,
                    _ => 0
                };
            }).Sum();

            return sum;
        }
    }

    public class DndClass
    {
        public string Name { get; init; }
        public string IndexName { get; init; }
        public int HitDie { get; init; }
    }
}

namespace System.Runtime.CompilerServices
{
    internal static class IsExternalInit
    {
    }
}