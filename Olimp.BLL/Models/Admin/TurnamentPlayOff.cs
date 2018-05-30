using System.Collections.Generic;

namespace Olimp.BLL.Models
{
    public class TurnamentPlayOff
    {
        public string PlayOffId { get; set; }
        public int NumberCircle { get; set; }
        public bool StateCode { get; set; }
        public List<GroupTourNumber> GroupTourNumber { get; set; }
    }
}