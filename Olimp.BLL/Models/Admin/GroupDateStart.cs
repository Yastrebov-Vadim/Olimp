using System;
using System.Collections.Generic;

namespace Olimp.BLL.Models
{
    public class GroupDateStart
    {
        public DateTime? DateStart { get; set; }
        public string Arena { get; set; }
        public List<GameTurnament> GameTurnament { get; set; }
    }
}