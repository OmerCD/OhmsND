using System.Collections.Generic;

namespace OhmsND.Models.Request.Character
{
    public class CharacterCreateModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Gender { get; set; }
        public string RaceName { get; set; }
        public IEnumerable<CharacterCreateModelClass> Classes { get; set; }
        public IEnumerable<CharacterCreateModelAttribute> Attributes { get; set; }
    }

    public class CharacterCreateModelAttributes
    {
        public CharacterCreateModelAttribute Strength { get; set; }
        public CharacterCreateModelAttribute Dexterity { get; set; }
        public CharacterCreateModelAttribute Constitution { get; set; }
        public CharacterCreateModelAttribute Intelligence { get; set; }
        public CharacterCreateModelAttribute Wisdom { get; set; }
        public CharacterCreateModelAttribute Charisma { get; set; }
    }
    public class CharacterCreateModelAttribute
    {
        public byte Score { get; set; }
        public int Modifier { get; set; }
    }
    public class CharacterCreateModelClass
    {
        public string Name { get; set; }
        public int Level { get; set; }
    }
}