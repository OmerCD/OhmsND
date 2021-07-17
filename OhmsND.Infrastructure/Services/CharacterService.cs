using System;
using System.Collections.Generic;
using System.Linq;
using Bogus;
using Bogus.DataSets;
using MapsterMapper;
using MongoORM4NetCore.Interfaces;
using OhmsND.Core.Constants;
using OhmsND.Core.Entities.Mongo;
using OhmsND.Infrastructure.Abstractions.Dto.Character;
using OhmsND.Infrastructure.Abstractions.Services;
using Attribute = OhmsND.Core.Entities.Mongo.Attribute;

namespace OhmsND.Infrastructure.Services
{
    public class CharacterService : ICharacterService
    {
        private readonly IRepository<Character> _repository;
        private readonly IDieService _dieService;
        private readonly IMapper _mapper;
        

        public CharacterService(IRepository<Character> repository, IDieService dieService, IMapper mapper)
        {
            _repository = repository;
            _dieService = dieService;
            _mapper = mapper;
        }

        public Character Create(Character character)
        {
            if (_repository.Insert(character))
            {
                return character;
            }

            return null;
        }

        public CharacterDto Create(IEnumerable<string> damageTypeIndexNames = null)
        {
            var fakerInstance = new Faker<Character>()
                    .RuleFor(x => x.Gender, faker => faker.PickRandom<Gender>())
                    .RuleFor(x => x.FirstName,
                        (faker, character) => faker.Name.FirstName((Name.Gender) (int) character.Gender))
                    .RuleFor(x => x.LastName,
                        (faker, character) => faker.Name.LastName((Name.Gender) (int) character.Gender))
                    .RuleFor(x => x.Classes, (faker) => faker.Random
                        .ListItems(DndClasses.IndexToClasses.Values.ToList())
                        .Select(x => new CharacterClass() {IndexName = x.IndexName, Level = faker.Random.Number(1, 7)})
                        .ToList())
                    .RuleFor(x => x.Attributes, GenerateRandomAttributes);
            if (damageTypeIndexNames != null)
            {
                var damageTypeList = damageTypeIndexNames.ToList();

                IEnumerable<string> DamageTypeSetter(Faker faker)
                {
                    var listItems = faker.Random.ListItems(damageTypeList);
                    foreach (var listItem in listItems)
                    {
                        damageTypeList.Remove(listItem);
                    }

                    return listItems;
                }

                fakerInstance = fakerInstance
                    .RuleFor(x=> x.Immunities, DamageTypeSetter)
                    .RuleFor(x=> x.Resistances, DamageTypeSetter)
                    .RuleFor(x=> x.Weaknesses, DamageTypeSetter);
            }
            var generated = fakerInstance.Generate();
            return _mapper.Map<CharacterDto>(generated);
        }

        private static Attributes GenerateRandomAttributes()
        {
            var attributes = new Attributes()
            {
                Strength = new Attribute()
                {
                    Score = (byte) DieFacade.GetCharacterAttributeDieResult()
                },
                Charisma = new Attribute()
                {
                    Score = (byte) DieFacade.GetCharacterAttributeDieResult()
                },
                Constitution = new Attribute()
                {
                    Score = (byte) DieFacade.GetCharacterAttributeDieResult()
                },
                Dexterity = new Attribute()
                {
                    Score = (byte) DieFacade.GetCharacterAttributeDieResult()
                },
                Intelligence = new Attribute()
                {
                    Score = (byte) DieFacade.GetCharacterAttributeDieResult()
                },
                Wisdom = new Attribute()
                {
                    Score = (byte) DieFacade.GetCharacterAttributeDieResult()
                },
            };
            return attributes;
        }
    }
}