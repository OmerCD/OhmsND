using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using OhmsND.Core.Constants;
using OhmsND.Domain.Queries;
using OhmsND.Infrastructure.Abstractions.Dto.Character;
using OhmsND.Infrastructure.Abstractions.Services;

namespace OhmsND.Domain.Commands.Character
{
    public class CreateRandomCharacterCommand : IRequest<CharacterDto>
    {
        
    }
    public class CreateRandomCharacterCommandHandler : IRequestHandler<CreateRandomCharacterCommand, CharacterDto>
    {
        private readonly IMediator _mediator;
        private readonly ICharacterService _characterService;

        public CreateRandomCharacterCommandHandler(IMediator mediator, ICharacterService characterService)
        {
            _mediator = mediator;
            _characterService = characterService;
        }

        public async Task<CharacterDto> Handle(CreateRandomCharacterCommand request, CancellationToken cancellationToken)
        {
            var damageTypeQuery = new GetFromDndApiQuery(DndApiCategories.DamageTypes);
            var damagesTypes = await _mediator.Send(damageTypeQuery, cancellationToken);
            var characterDto = _characterService.Create(damagesTypes.Results.Select(x => x.Index));
            return characterDto;
        }
    }
}