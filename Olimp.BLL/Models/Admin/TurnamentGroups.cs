using System.Collections.Generic;

namespace Olimp.BLL.Models
{
    public class TurnamentGroups
    {
        public string GroupId { get; set; }
        public List<PositionCommand> PositionCommand { get; set; }
        public List<GroupTourNumber> GroupTourNumber { get; set; }
    }
}