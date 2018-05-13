using System;
using System.Collections.Generic;

namespace Olimp.BLL.Models
{
    public class TurnamentAdmin
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public DateTime? DateStart { get; set; }
        public DateTime? DateEnd { get; set; }
        public int Type { get; set; }
        public bool StateCode { get; set; }
        public int Step { get; set; }
        public string Description { get; set; }
        public int ContributionGame { get; set; }
        public int ContributionTournament { get; set; }
        public List<CommandForTurnament> Commands { get; set; }
        public List<PositionCommand> PositionCommand { get; set; }
        public List<GameTurnament> GameTurnament { get; set; }
    }
}