using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using MongoDB.Bson.Serialization.Attributes;
using MongoORM4NetCore.Interfaces;
using OhmsND.Core.Attributes;
using OhmsND.Core.Constants;

namespace OhmsND.Core.Entities.Mongo
{
    public class Character : DbObject
    {
        private Attributes _attributes;
        
        public string OwnerId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        [BsonIgnore] public int Level => Classes.Sum(x => x.Level);
        public ICollection<Class> Classes { get; set; }
        [BsonIgnore] public int Initiative => Attributes.Dexterity.Modifier;

        public Attributes Attributes
        {
            get => _attributes;
            set
            {
                _attributes = value;
                Skills = new Skills(this);
            }
        }

        [BsonIgnore]public Skills Skills { get; set; }

        public int ArmorClassBase => 10 + Attributes.Dexterity.Modifier +
                                     DndClasses.GetACModifier(Attributes, Classes.Select(x => x.IndexName));

        public int MaxHealth
        {
            get
            {
                int baseHealth = (int) Classes
                    .Select(x => new {Class = DndClasses.IndexToClasses[x.IndexName], x.Level})
                    .Sum(x => (x.Level * x.Class.HitDie) * 0.65);
                return baseHealth + Attributes.Constitution.Modifier * Level;
            }
        }

        public int CurrentHealth { get; set; }
    }

    public class Class
    {
        public int Level { get; set; }
        public string IndexName { get; set; }
    }

    public class Skills
    {
        private readonly Character _character;
        [IndexName("acrobatics")] public Skill Acrobatics { get; set; }
        [IndexName("animal_handling")] public Skill AnimalHandling { get; set; }
        [IndexName("arcana")] public Skill Arcana { get; set; }
        [IndexName("athletics")] public Skill Athletics { get; set; }
        [IndexName("deception")] public Skill Deception { get; set; }
        [IndexName("history")] public Skill History { get; set; }
        [IndexName("insight")] public Skill Insight { get; set; }
        [IndexName("intimidation")] public Skill Intimidation { get; set; }
        [IndexName("investigation")] public Skill Investigation { get; set; }
        [IndexName("medicine")] public Skill Medicine { get; set; }
        [IndexName("nature")] public Skill Nature { get; set; }
        [IndexName("perception")] public Skill Perception { get; set; }
        [IndexName("performance")] public Skill Performance { get; set; }
        [IndexName("persuasion")] public Skill Persuasion { get; set; }
        [IndexName("religion")] public Skill Religion { get; set; }
        [IndexName("sleight_of_hand")] public Skill SleightOfHand { get; set; }
        [IndexName("stealth")] public Skill Stealth { get; set; }
        [IndexName("survival")] public Skill Survival { get; set; }

        public static IDictionary<string, Func<Attributes, Attribute>> SkillToAttributes =
            new Dictionary<string, Func<Attributes, Attribute>>()
            {
                {"acrobatics", x => x.Dexterity},
                {"animal_handling", x => x.Wisdom},
                {"arcana", x => x.Intelligence},
                {"athletics", x => x.Strength},
                {"deception", x => x.Charisma},
                {"history", x => x.Intelligence},
                {"insight", x => x.Wisdom},
                {"intimidation", x => x.Charisma},
                {"investigation", x => x.Intelligence},
                {"medicine", x => x.Wisdom},
                {"nature", x => x.Intelligence},
                {"perception", x => x.Wisdom},
                {"performance", x => x.Charisma},
                {"persuasion", x => x.Charisma},
                {"religion", x => x.Intelligence},
                {"sleight_of_hand", x => x.Dexterity},
                {"stealth", x => x.Dexterity},
                {"survival", x => x.Wisdom},
            };

        public Skills(Character character)
        {
            _character = character;
            Acrobatics = new Skill(character);
            AnimalHandling = new Skill(character);
            Arcana = new Skill(character);
            Athletics = new Skill(character);
            Deception = new Skill(character);
            History = new Skill(character);
            Insight = new Skill(character);
            Intimidation = new Skill(character);
            Investigation = new Skill(character);
            Medicine = new Skill(character);
            Nature = new Skill(character);
            Perception = new Skill(character);
            Performance = new Skill(character);
            Persuasion = new Skill(character);
            Religion = new Skill(character);
            SleightOfHand = new Skill(character);
            Stealth = new Skill(character);
            Survival = new Skill(character);
            var propertyInfos = GetType().GetProperties();
            foreach (var propertyInfo in propertyInfos)
            {
                var indexName = propertyInfo.GetCustomAttribute<IndexNameAttribute>().IndexName;
                var skillInstance = (Skill) propertyInfo.GetValue(this);
                skillInstance.IndexName = indexName;
                skillInstance.BaseAttributeModifier = SkillToAttributes[indexName].Invoke(character.Attributes).Modifier;
            }
        }
    }


    public class Attributes
    {
        public Attribute Strength { get; set; }
        public Attribute Dexterity { get; set; }
        public Attribute Constitution { get; set; }
        public Attribute Intelligence { get; set; }
        public Attribute Wisdom { get; set; }
        public Attribute Charisma { get; set; }
    }

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
                else if (HasProficiency)
                {
                }
                else
                {
                    levelBonus = 0;
                }

                return BaseAttributeModifier + levelBonus + BonusModifier;
            }
        }
    }

    public class Attribute
    {
        public byte Score { get; set; }

        [BsonIgnore]
        public int Modifier
        {
            get
            {
                return ((int) (Score / 2)) - 5;
                return Score switch
                {
                    1 => -5,
                    2 => -4,
                    3 => -4,
                    4 => -3,
                    5 => -3,
                    6 => -2,
                    7 => -2,
                    8 => -1,
                    9 => -1,
                    10 => 0,
                    11 => 0,
                    12 => 1,
                    13 => 1,
                    14 => 2,
                    15 => 2,
                    16 => 3,
                    17 => 3,
                    18 => 4,
                    19 => 4,
                    20 => 5,
                    21 => 5,
                    22 => 6,
                    23 => 6,
                    24 => 7,
                    25 => 7,
                    26 => 8,
                    27 => 8,
                    28 => 9,
                    29 => 9,
                    30 => 10,
                    _ => -6
                };
            }
        }
    }
}