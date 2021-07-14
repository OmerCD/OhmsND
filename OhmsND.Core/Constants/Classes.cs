using System;
using System.Collections.Generic;
using System.Linq;
using static OhmsND.Core.Constants.ClassIndexNames;

namespace OhmsND.Core.Constants
{
    public static class DndClasses
    {
        public static DndClass Warlock { get; } = new()
        {
            Name = "Warlock",
            IndexName = IndexNameWarlock,
            HitDie = 8
        };

        public static DndClass Barbarian { get; } = new()
        {
            Name = "Barbarian",
            IndexName = IndexNameBarbarian,
            HitDie = 12
        };

        public static DndClass Bard { get; } = new()
        {
            Name = "Bard",
            IndexName = IndexNameBard,
            HitDie = 8
        };

        public static DndClass Rouge { get; } = new()
        {
            Name = "Rouge",
            IndexName = IndexNameRouge,
            HitDie = 8
        };

        public static DndClass Wizard { get; } = new()
        {
            Name = "Wizard",
            IndexName = IndexNameWizard,
            HitDie = 6
        };

        public static DndClass Monk { get; } = new()
        {
            Name = "Monk",
            IndexName = IndexNameMonk,
            HitDie = 8
        };

        public static DndClass Cleric { get; } = new()
        {
            Name = "Cleric",
            IndexName = IndexNameCleric,
            HitDie = 8
        };

        public static DndClass Druid { get; } = new()
        {
            Name = "Druid",
            IndexName = IndexNameDruid,
            HitDie = 8
        };

        public static DndClass Fighter { get; } = new()
        {
            Name = "Fighter",
            IndexName = IndexNameFighter,
            HitDie = 10
        };

        public static DndClass Paladin { get; } = new()
        {
            Name = "Paladin",
            IndexName = IndexNamePaladin,
            HitDie = 10
        };

        public static DndClass Ranger { get; } = new()
        {
            Name = "Ranger",
            IndexName = IndexNameRanger,
            HitDie = 10
        };

        public static DndClass Sorcerer { get; } = new()
        {
            Name = "Sorcerer",
            IndexName = IndexNameSorcerer,
            HitDie = 6
        };

        public static readonly IDictionary<string, DndClass> IndexToClasses;

        static DndClasses()
        {
            IndexToClasses = typeof(DndClasses).GetProperties()
                .ToDictionary(x => ((DndClass) (x.GetValue(null))).IndexName, info => (DndClass) info.GetValue(null));
        }

        private static readonly Dictionary<string, Func<Entities.Mongo.Attributes, int>> SpecialClassesForAC = new()
        {
            {IndexNameBarbarian, attributes => attributes.Constitution.Modifier},
            {IndexNameMonk, attributes => attributes.Wisdom.Modifier},
            {IndexNameSorcerer, _ => 3}
        };

        public static int GetACModifier(Entities.Mongo.Attributes attributes, IEnumerable<string> classIndexNames)
        {
            var dndClasses = classIndexNames.Select(x => IndexToClasses[x])
                .Where(x => SpecialClassesForAC.ContainsKey(x.IndexName));
            var sum = dndClasses.Select(x => SpecialClassesForAC[x.IndexName](attributes)).Sum();
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