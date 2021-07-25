using System.Collections.Generic;

namespace OhmsND.Models.Response.Character
{
    public class CharacterViewModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public IEnumerable<AttributeViewModel> Attributes { get; set; }
        public IEnumerable<SkillViewModel> Skills { get; set; }
    }

    public class AttributeViewModel
    {
        public string Name { get; set; }
        public string DisplayName { get; set; }
        public int Value { get; set; }
        public int Modifier { get; set; }
    }

    public class SkillViewModel
    {
        public string Name { get; set; }
        public string DisplayName { get; set; }
        public string ShortName { get; set; }
        public int Bonus { get; set; }
        public bool HasProficiency { get; set; }
        public bool HasExpertise { get; set; }
    }
}