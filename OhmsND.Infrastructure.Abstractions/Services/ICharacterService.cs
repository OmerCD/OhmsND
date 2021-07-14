using OhmsND.Infrastructure.Abstractions.Dto.Character;

namespace OhmsND.Infrastructure.Abstractions.Services
{
    public interface ICharacterService : IScopedService
    {
        CharacterDto Create();
    }
}