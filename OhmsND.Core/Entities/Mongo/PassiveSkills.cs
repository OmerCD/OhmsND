using System;
using System.Reflection;
using OhmsND.Core.Attributes;
using OhmsND.Core.Constants;

namespace OhmsND.Core.Entities.Mongo
{
    public class PassiveSkills
    {
        private readonly Character _character;
        [IndexName(SkillIndexNames.IndexNamePerception)]public Skill Perception { get; set; }
        [IndexName(SkillIndexNames.IndexNameInvestigation)]public Skill Investigation { get; set; }
        [IndexName(SkillIndexNames.IndexNameInsight)]public Skill Insight { get; set; }
        
        public PassiveSkills(Character character)
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
                skillInstance.BaseAttributeModifier = Skills.SkillToAttributes[indexName](character.Attributes).Modifier + 10;
                propertyInfo.SetValue(this, skillInstance);
            }
        }
    }
}