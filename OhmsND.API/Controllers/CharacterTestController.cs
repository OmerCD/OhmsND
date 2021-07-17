using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MongoDB.Bson;
using MongoORM4NetCore;
using MongoORM4NetCore.Interfaces;
using OhmsND.Core.Entities.Mongo;
using OhmsND.Domain.Commands.Character;
using OhmsND.Domain.Queries;
using OhmsND.Domain.Queries.Classes;
using OhmsND.Infrastructure.Abstractions.Services;
using OhmsND.Infrastructure.Services;

namespace OhmsND.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CharacterTestController : ControllerBase
    {
        private readonly ILogger<CharacterTestController> _logger;
        private readonly IRepository<Character> _repository;
        private readonly ICharacterService _characterService;
        private readonly IMediator _mediator;
        public CharacterTestController(ILogger<CharacterTestController> logger, IRepository<Character> repository, ICharacterService characterService, IMediator mediator)
        {
            _logger = logger;
            _repository = repository;
            _characterService = characterService;
            _mediator = mediator;
        }

        [HttpGet("any/{typeName}")]
        public async Task<IActionResult> GetAll(string typeName)
        {
            var query = new GetFromDndApiQuery(typeName);
            var response = await _mediator.Send(query);
            return Ok(response);
        }
        [HttpGet("classes")]
        public async Task<IActionResult> GetAllClasses(CancellationToken cancellationToken)
        {
            var response = await _mediator.Send(new GetAllClassesQuery(), cancellationToken);
            return Ok(response);
        }
        [HttpPost("random")]
        public async Task<IActionResult> CreateRandom(CancellationToken cancellationToken)
        {
            var command = new CreateRandomCharacterCommand();
            var characterDto = await _mediator.Send(command, cancellationToken);
            return Ok(characterDto);
        }
        [HttpGet("all")]
        public IActionResult GetAll()
        {
            return Ok(_repository.GetAll(new BsonDocument()));
        }
        [HttpGet("read")]
        public IActionResult Read()
        {
            var character = _repository.GetOne("061dedb0-c421-47ae-a87e-2098eb53907d");
            return Ok(character);
        }
        [HttpGet]
        public IActionResult Get()
        {
            // var character = _repository.GetOne("1cc8d0da-6fd0-4c6b-9a0a-9ae5bc6fbfba");
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
            var character = new Character()
            {
                Attributes = attributes,
                Classes = new List<CharacterClass>
                {
                    new ()
                    {
                        Level = 5,
                        IndexName = "barbarian"
                    }
                },
                FirstName = "Henry", LastName = "George",
            };
            _repository.Insert(character);
            return Ok(character);
        }
    }
}