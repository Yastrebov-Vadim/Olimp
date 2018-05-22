using System.Collections.Generic;

namespace Olimp.BLL.Models
{
    public class Turnament
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string DateStart { get; set; }
        public string DateEnd { get; set; }
        public string Description { get; set; }
        public int ContributionGame { get; set; }
        public int ContributionTournament { get; set; }
        public int Type { get; set; }
        public List<CommandForTurnament> Commands { get; set; }
        public List<PositionCommand> PositionCommand { get; set; }
        public List<GroupTourNumber> GroupTourNumber { get; set; }
        public List<TurnamentGroups> TurnamentGroups { get; set; }
    }
}