using System.Collections.Generic;
using System.Linq;
using MongoDB.Bson.Serialization.Attributes;
using MongoORM4NetCore.Interfaces;
using OhmsND.Core.Constants;

namespace OhmsND.Core.Entities.Mongo
{
    public class Character : DbObject
    {
        private Attributes _attributes;
        
        public string OwnerId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        [BsonIgnore] public PassiveSkills PassiveSkills { get; private set; }
        [BsonIgnore] public int Level => Classes.Sum(x => x.Level);
        public ICollection<CharacterClass> Classes { get; set; }
        [BsonIgnore] public int Initiative => Attributes.Dexterity.Modifier;
        public Gender Gender { get; set; }

        public Attributes Attributes
        {
            get => _attributes;
            set
            {
                _attributes = value;
                Skills = new Skills(this);
                PassiveSkills = new PassiveSkills(this);
            }
        }

        [BsonIgnore]public Skills Skills { get; private set; }

        public int ArmorClassBase => 10 + Attributes.Dexterity.Modifier +
                                     DndClasses.GetACModifier(Attributes, Classes.Select(x => x.IndexName));

        public int MaxHealth
        {
            get
            {
                var baseHealth = (int) Classes
                    .Select(x => new {Class = DndClasses.IndexToClasses[x.IndexName], x.Level})
                    .Sum(x => (x.Level * x.Class.HitDie) * 0.65);
                return baseHealth + Attributes.Constitution.Modifier * Level;
            }
        }

        public int CurrentHealth { get; set; }
    }

    public enum Gender
    {
        Male, Female
    }
}