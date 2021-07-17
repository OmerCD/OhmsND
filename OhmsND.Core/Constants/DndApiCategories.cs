using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using OhmsND.Core.Attributes;

namespace OhmsND.Core.Constants
{
    public class DndApiCategories
    {
        [IndexName("ability-scores")] public const string AbilityScores = "ability-scores";
        [IndexName("alignments")] public const string Alignments = "alignments";
        [IndexName("backgrounds")] public const string Backgrounds = "backgrounds";
        [IndexName("classes")] public const string Classes = "classes";
        [IndexName("conditions")] public const string Conditions = "conditions";
        [IndexName("damage-types")] public const string DamageTypes = "damage-types";
        [IndexName("equipment-categories")] public const string EquipmentCategories = "equipment-categories";
        [IndexName("equipment")] public const string Equipment = "equipment";
        [IndexName("features")] public const string Features = "features";
        [IndexName("languages")] public const string Languages = "languages";
        [IndexName("magic-items")] public const string MagicItems = "magic-items";
        [IndexName("magic-schools")] public const string MagicSchools = "magic-schools";
        [IndexName("monsters")] public const string Monsters = "monsters";
        [IndexName("proficiencies")] public const string Proficiencies = "proficiencies";
        [IndexName("races")] public const string Races = "races";
        [IndexName("rules")] public const string Rules = "rules";
        [IndexName("rule-sections")] public const string RuleSections = "rule-sections";
        [IndexName("skills")] public const string Skills = "skills";
        [IndexName("spells")] public const string Spells = "spells";
        [IndexName("starting-equipment")] public const string StartingEquipment = "starting-equipment";
        [IndexName("subclasses")] public const string Subclasses = "subclasses";
        [IndexName("subraces")] public const string Subraces = "subraces";
        [IndexName("traits")] public const string Traits = "traits";
        [IndexName("weapon-properties")] public const string WeaponProperties = "weapon-properties";
        public static IDictionary<string, string> CategoriesDictionary;

        static DndApiCategories()
        {
            var fieldInfos = typeof(DndApiCategories).GetFields(
                BindingFlags.Public | BindingFlags.Static |
                BindingFlags.FlattenHierarchy);
            CategoriesDictionary = fieldInfos.Where(x=>x.IsLiteral && !x.IsInitOnly).ToDictionary(x => x.GetCustomAttribute<IndexNameAttribute>().IndexName,
                field => field.GetValue(null).ToString());
        }
    }
}