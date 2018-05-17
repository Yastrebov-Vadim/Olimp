using System.Collections.Generic;

namespace Olimp.BLL.Models
{
    public class DivideForDayRequest
    {
        public string TurnamentId { get; set; }
        public int Tour { get; set; }
        public List<DayGame> Days { get; set; }
    }
}