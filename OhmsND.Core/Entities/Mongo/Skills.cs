using System;
using System.Collections.Generic;
using System.Reflection;
using OhmsND.Core.Attributes;
using OhmsND.Core.Constants;

namespace OhmsND.Core.Entities.Mongo
{
    public class Skills
    {
        
        private readonly Character _character;
        [IndexName(SkillIndexNames.IndexNameAcrobatics)] public Skill Acrobatics { get; set; }
        [IndexName(SkillIndexNames.IndexNameAnimalHandling)] public Skill AnimalHandling { get; set; }
        [IndexName(SkillIndexNames.IndexNameArcana)] public Skill Arcana { get; set; }
        [IndexName(SkillIndexNames.IndexNameAthletics)] public Skill Athletics { get; set; }
        [IndexName(SkillIndexNames.IndexNameDeception)] public Skill Deception { get; set; }
        [IndexName(SkillIndexNames.IndexNameHistory)] public Skill History { get; set; }
        [IndexName(SkillIndexNames.IndexNameInsight)] public Skill Insight { get; set; }
        [IndexName(SkillIndexNames.IndexNameIntimidation)] public Skill Intimidation { get; set; }
        [IndexName(SkillIndexNames.IndexNameInvestigation)] public Skill Investigation { get; set; }
        [IndexName(SkillIndexNames.IndexNameMedicine)] public Skill Medicine { get; set; }
        [IndexName(SkillIndexNames.IndexNameNature)] public Skill Nature { get; set; }
        [IndexName(SkillIndexNames.IndexNamePerception)] public Skill Perception { get; set; }
        [IndexName(SkillIndexNames.IndexNamePerformance)] public Skill Performance { get; set; }
        [IndexName(SkillIndexNames.IndexNamePersuasion)] public Skill Persuasion { get; set; }
        [IndexName(SkillIndexNames.IndexNameReligion)] public Skill Religion { get; set; }
        [IndexName(SkillIndexNames.IndexNameSleightOfHand)] public Skill SleightOfHand { get; set; }
        [IndexName(SkillIndexNames.IndexNameStealth)] public Skill Stealth { get; set; }
        [IndexName(SkillIndexNames.IndexNameSurvival)] public Skill Survival { get; set; }

        public static readonly IDictionary<string, Func<Attributes, Attribute>> SkillToAttributes =
            new Dictionary<string, Func<Attributes, Attribute>>()
            {
                {SkillIndexNames.IndexNameAcrobatics, x => x.Dexterity},
                {SkillIndexNames.IndexNameAnimalHandling, x => x.Wisdom},
                {SkillIndexNames.IndexNameArcana, x => x.Intelligence},
                {SkillIndexNames.IndexNameAthletics, x => x.Strength},
                {SkillIndexNames.IndexNameDeception, x => x.Charisma},
                {SkillIndexNames.IndexNameHistory, x => x.Intelligence},
                {SkillIndexNames.IndexNameInsight, x => x.Wisdom},
                {SkillIndexNames.IndexNameIntimidation, x => x.Charisma},
                {SkillIndexNames.IndexNameInvestigation, x => x.Intelligence},
                {SkillIndexNames.IndexNameMedicine, x => x.Wisdom},
                {SkillIndexNames.IndexNameNature, x => x.Intelligence},
                {SkillIndexNames.IndexNamePerception, x => x.Wisdom},
                {SkillIndexNames.IndexNamePerformance, x => x.Charisma},
                {SkillIndexNames.IndexNamePersuasion, x => x.Charisma},
                {SkillIndexNames.IndexNameReligion, x => x.Intelligence},
                {SkillIndexNames.IndexNameSleightOfHand, x => x.Dexterity},
                {SkillIndexNames.IndexNameStealth, x => x.Dexterity},
                {SkillIndexNames.IndexNameSurvival, x => x.Wisdom},
            };

        public Skills(Character character)
        {
            if (character.Attributes == null)
            {
                throw new Exception("Can not set skills without assigning Attributes first");
            }
            _character = character;
            var propertyInfos = GetType().GetProperties();
            foreach (var propertyInfo in propertyInfos)
            {
                var indexName = propertyInfo.GetCustomAttribute<IndexNameAttribute>().IndexName;
                var skillInstance = (Skill) Activator.CreateInstance(propertyInfo.PropertyType, args: character);
                skillInstance.IndexName = indexName;
                skillInstance.BaseAttributeModifier = SkillToAttributes[indexName](character.Attributes).Modifier;
                propertyInfo.SetValue(this, skillInstance);
            }
        }
    }
}