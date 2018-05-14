using System;

namespace Olimp.BLL.Models
{
    public class GameTurnament
    {
        public string Id { get; set; }
        public string IdCommandOne { get; set; }
        public string IdCommandTwo { get; set; }
        public string CommandOneName { get; set; }
        public string CommandTwoName { get; set; }
        public int Tour { get; set; }
        public DateTime? DateStart { get; set; }
        public int CommandOneGoals { get; set; }
        public int CommandTwoGoals { get; set; }
        public int CommandOnePoints { get; set; }
        public int CommandTwoPoints { get; set; }
    }
}