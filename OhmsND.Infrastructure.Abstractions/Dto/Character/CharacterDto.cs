using System.Collections.Generic;
using System.Linq;

namespace OhmsND.Infrastructure.Abstractions.Dto.Character
{
    public class CharacterDto
    {
        public string OwnerId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public PassiveSkillsDto PassiveSkills { get; set; }
         public int Level { get; set; }
        public ICollection<CharacterClassDto> Classes { get; set; }
         public int Initiative { get; set; }
        public GenderDto Gender { get; set; }
        
        public AttributesDto Attributes { get; set; }
        
        public SkillsDto Skills { get; set; }
        
        public int ArmorClassBase { get; set; }
        
        public int MaxHealth { get; set; }
        
        public int CurrentHealth { get; set; }
    }

    public class AttributesDto
    {
        public AttributeDto Strength { get; set; }
        public AttributeDto Dexterity { get; set; }
        public AttributeDto Constitution { get; set; }
        public AttributeDto Intelligence { get; set; }
        public AttributeDto Wisdom { get; set; }
        public AttributeDto Charisma { get; set; }
    }

    public class AttributeDto
    {
        public byte Score { get; set; }
        public int Modifier { get; set; }
    }

    public class PassiveSkillsDto
    {
        public SkillDto Perception { get; set; }
        public SkillDto Investigation { get; set; }
        public SkillDto Insight { get; set; }
    }

    public class CharacterClassDto
    {
        public int Level { get; set; }
        public string IndexName { get; set; }
    }
    public enum GenderDto{Male, Female}

    public class SkillsDto
    {
        public SkillDto Acrobatics { get; set; }
        public SkillDto AnimalHandling { get; set; }
        public SkillDto Arcana { get; set; }
        public SkillDto Athletics { get; set; }
        public SkillDto Deception { get; set; }
        public SkillDto History { get; set; }
        public SkillDto Insight { get; set; }
        public SkillDto Intimidation { get; set; }
        public SkillDto Investigation { get; set; }
        public SkillDto Medicine { get; set; }
        public SkillDto Nature { get; set; }
        public SkillDto Perception { get; set; }
        public SkillDto Performance { get; set; }
        public SkillDto Persuasion { get; set; }
        public SkillDto Religion { get; set; }
        public SkillDto SleightOfHand { get; set; }
        public SkillDto Stealth { get; set; }
        public SkillDto Survival { get; set; }
    }

    public class SkillDto
    {
        public bool HasProficiency { get; set; }
        public bool HasExpertise { get; set; }
       public string IndexName { get; set; }
       public int BaseAttributeModifier { get; set; }
        public int BonusModifier { get; set; }

        public int SkillModifier { get; set; }
    }
}