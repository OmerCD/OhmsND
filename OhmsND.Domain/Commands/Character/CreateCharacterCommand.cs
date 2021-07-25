using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MapsterMapper;
using MediatR;
using OhmsND.Core.Constants;
using OhmsND.Core.Entities.Mongo;
using OhmsND.Domain.Queries;
using OhmsND.Domain.Queries.Races;
using OhmsND.Infrastructure.Abstractions.Dto.Character;
using OhmsND.Infrastructure.Abstractions.Services;

namespace OhmsND.Domain.Commands.Character
{
    public record CreateCharacterCommand : IRequest<CharacterDto>
    {
        public string OwnerId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string RaceName { get; set; }
        public IEnumerable<CharacterClassDto> Classes { get; set; }
        public GenderDto Gender { get; set; }
        public AttributesDto Attributes { get; set; }
    }
    public class CreateCharacterCommandHandler : IRequestHandler<CreateCharacterCommand, CharacterDto>
    {
        private readonly ICharacterService _characterService;
        private readonly IMapper _mapper;
        private readonly IMediator _mediator;

        public CreateCharacterCommandHandler(ICharacterService characterService, IMapper mapper, IMediator mediator)
        {
            _characterService = characterService;
            _mapper = mapper;
            _mediator = mediator;
        }

        public async Task<CharacterDto> Handle(CreateCharacterCommand request, CancellationToken cancellationToken)
        {
            var classes = _mapper.Map<ICollection<CharacterClassDto>>(request.Classes);
            var attributes = _mapper.Map<AttributesDto>(request.Attributes);
            var newCharacter = new CharacterCreateDto()
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                RaceName = request.RaceName,
                OwnerId = request.OwnerId,
                Gender = (GenderDto) (int) request.Gender,
                Classes = classes,
                Attributes = attributes,
            };
           return _characterService.Create((IEnumerable<string>) newCharacter);
        }
    }
}