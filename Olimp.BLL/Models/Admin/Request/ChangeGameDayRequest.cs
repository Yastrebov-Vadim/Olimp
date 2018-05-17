using System;
using System.Collections.Generic;

namespace Olimp.BLL.Models
{
    public class ChangeGameDayRequest
    {
        public string TurnamentId { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime NewStartDate { get; set; }
        public string Arena { get; set; }
        public int Tour { get; set; }
    }
}