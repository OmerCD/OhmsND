using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MongoDB.Bson;
using MongoORM4NetCore;
using MongoORM4NetCore.Interfaces;
using OhmsND.Core.Entities.Mongo;
using OhmsND.Infrastructure.Services;

namespace OhmsND.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;
        private readonly IRepository<Character> _repository;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, IRepository<Character> repository)
        {
            _logger = logger;
            _repository = repository;
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
                Classes = new List<Class>
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