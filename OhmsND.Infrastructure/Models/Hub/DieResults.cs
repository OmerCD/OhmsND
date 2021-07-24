using System.Collections.Generic;
using OhmsND.Infrastructure.Abstractions.Dto;

namespace OhmsND.Infrastructure.Models.Hub
{
    public class DieResults
    {
        public DieResultUser User { get; set; }
        public IEnumerable<DieResult> Results { get; set; }
    }
    public class DieResultUser
    {
        public string UserName { get; set; }
        public string UserId { get; set; }
    }
}