using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MapsterMapper;
using MediatR;
using OhmsND.Infrastructure.Abstractions.Dto;
using OhmsND.Infrastructure.Abstractions.Services;

namespace OhmsND.Domain.Commands.DieRoll
{
    public record RollDiceCommand(IEnumerable<RollDiceItem> Dice) : IRequest<IEnumerable<RollDiceCommandResponse>>
    {
    }

    public record RollDiceItem(int Count, int DieType)
    {
    }

    public record RollDiceCommandResponse
    {
        public IEnumerable<RollDiceCommandResponseResult> DieResults { get; set; }
        public int Value { get; set; }
        public RollStatus RollStatus { get; set; }
    }

    public enum RollStatus
    {
        Failed,
        Neutral,
        Success
    }

    public record RollDiceCommandResponseResult
    {
        public int Value { get; set; }
        public DieStatus DieStatus { get; set; }
    }

    public enum DieStatus
    {
        Failed,
        Neutral,
        Success
    }

    public class RollDiceCommandHandler : IRequestHandler<RollDiceCommand, IEnumerable<RollDiceCommandResponse>>
    {
        private readonly IDieService _dieService;
        private readonly IMapper _mapper;

        public RollDiceCommandHandler(IDieService dieService, IMapper mapper)
        {
            _dieService = dieService;
            _mapper = mapper;
        }

        public async Task<IEnumerable<RollDiceCommandResponse>> Handle(RollDiceCommand request,
            CancellationToken cancellationToken)
        {
            var rollResults = request.Dice.Select(x =>
                Task.Run(() => _dieService.RollWithResults(x.Count, (DieType) x.DieType), cancellationToken)).ToArray();
            await Task.WhenAll(rollResults);
            var results = rollResults.Select(x => x.Result);
            return _mapper.Map<IEnumerable<RollDiceCommandResponse>>(results);
        }
    }
}