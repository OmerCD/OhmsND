using System.Threading;
using System.Threading.Tasks;
using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OhmsND.API.Extensions;
using OhmsND.Domain.Commands.Character;
using OhmsND.Models.Request.Character;
using OhmsND.Models.Response.Character;

namespace OhmsND.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class CharacterController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IMapper _mapper;

        public CharacterController(IMediator mediator, IMapper mapper)
        {
            _mediator = mediator;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> CreateCharacter(CharacterCreateModel model, CancellationToken cancellationToken)
        {
            var command = _mapper.Map<CreateCharacterCommand>(model);
            command.OwnerId = User.GetId();
            var result = await _mediator.Send(command, cancellationToken);
            var response = _mapper.Map<CharacterViewModel>(result);
            return Ok(response);
        }
    }
}