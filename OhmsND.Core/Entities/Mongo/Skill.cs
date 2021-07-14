using MongoDB.Bson.Serialization.Attributes;

namespace OhmsND.Core.Entities.Mongo
{
    public class Skill
    {
        private readonly Character _character;

        public Skill(Character character)
        {
            _character = character;
        }

        public bool HasProficiency { get; set; }
        public bool HasExpertise { get; set; }
        [BsonIgnore] public string IndexName { get; set; }
        [BsonIgnore] public int BaseAttributeModifier { get; set; }
        public int BonusModifier { get; set; }

        public int SkillModifier
        {
            get
            {
                var levelBonus = _character.Level switch
                {
                    <=4 => 2,
                    <=8 => 3,
                    <=12 => 4,
                    <= 16 => 5,
                    <= 20 => 6,
                    _ => 2
                };
                if (HasExpertise)
                {
                    levelBonus *= 2;
                }
                else if (!HasProficiency)
                {
                    levelBonus = 0;
                }

                return BaseAttributeModifier + levelBonus + BonusModifier;
            }
        }
    }
}