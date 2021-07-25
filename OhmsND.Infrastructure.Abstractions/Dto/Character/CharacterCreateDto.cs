using System.Collections.Generic;

namespace OhmsND.Infrastructure.Abstractions.Dto.Character
{
    public class CharacterCreateDto
    {
        public string OwnerId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public IEnumerable<CharacterClassDto> Classes { get; set; }
        public GenderDto Gender { get; set; }
        public AttributesDto Attributes { get; set; }
        public string RaceName { get; set; }
    }
}