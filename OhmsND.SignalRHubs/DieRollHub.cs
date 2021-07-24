using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using OhmsND.Infrastructure.Models.Hub;

namespace OhmsND.SignalRHubs
{
    public interface IDieRollClient
    {
        Task DieRolled(DieResults results);
    }
    public class DieRollHub : Hub<IDieRollClient>
    {
    }
}