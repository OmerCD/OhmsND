using System.Collections.Generic;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OhmsND.API.Extensions;
using OhmsND.Domain.Commands.DieRoll;
using OhmsND.Models.Request.Die;

namespace OhmsND.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DieController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IMapper _mapper;

        public DieController(IMediator mediator, IMapper mapper)
        {
            _mediator = mediator;
            _mapper = mapper;
        }

        [HttpPost("roll")]
        [Authorize]
        public async Task<IActionResult> Roll(DieRollRequestModel model, CancellationToken cancellationToken)
        {
            
            var rollCommand = new RollDiceCommand(_mapper.Map<IEnumerable<RollDiceItem>>(model.Dice), new RollDiceUser(
                User.GetUserName(), User.GetId()));
            var result = await _mediator.Send(rollCommand, cancellationToken);
            return Ok(result);
        }
    }
}