using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.SignalR;
using OhmsND.Infrastructure.Abstractions.Dto;
using OhmsND.Infrastructure.Abstractions.Services;
using OhmsND.Infrastructure.Models.Hub;
using OhmsND.SignalRHubs;

namespace OhmsND.Domain.Commands.DieRoll
{
    public record RollDiceCommand(IEnumerable<RollDiceItem> Dice, RollDiceUser User) : IRequest<IEnumerable<RollDiceCommandResponse>>
    {
    }

    public record RollDiceItem(int Count, int DieType)
    {
    }

    public record RollDiceUser(string UserName, string UserId);

    public record RollDiceCommandResponse
    {
        public IEnumerable<RollDiceCommandResponseResult> DieResults { get; set; }
        public int Value { get; set; }
        public RollStatus RollStatus { get; set; }
        public DieType DieType { get; set; }
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
        private readonly IHubContext<DieRollHub,IDieRollClient> _dieRollHub;

        public RollDiceCommandHandler(IDieService dieService, IMapper mapper, IHubContext<DieRollHub, IDieRollClient> dieRollHub)
        {
            _dieService = dieService;
            _mapper = mapper;
            _dieRollHub = dieRollHub;
        }

        public async Task<IEnumerable<RollDiceCommandResponse>> Handle(RollDiceCommand request,
            CancellationToken cancellationToken)
        {
            var (rollDiceItems, rollDiceUser) = request;
            var rollResults = rollDiceItems.Select(x =>
                Task.Run(() => _dieService.RollWithResults(x.Count, (DieType) x.DieType), cancellationToken)).ToArray();
            await Task.WhenAll(rollResults);
            var results = rollResults.Select(x => x.Result);
            _dieRollHub.Clients.All.DieRolled(new DieResults()
            {
                Results = _mapper.Map<IEnumerable<DieResult>>(results),
                User = _mapper.Map<DieResultUser>(rollDiceUser)
            });
            return _mapper.Map<IEnumerable<RollDiceCommandResponse>>(results);
        }
    }
}