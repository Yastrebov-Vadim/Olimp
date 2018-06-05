using System;
using System.Collections.Generic;

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
        public int Status { get; set; }
        public DateTime? DateStart { get; set; }
        public string Arena { get; set; }
        public Goals CommandOneGoals { get; set; }
        public Goals CommandTwoGoals { get; set; }
        public Cards CommandOneCard { get; set; }
        public Cards CommandTwoCard { get; set; }
        public int CommandOnePoints { get; set; }
        public int CommandTwoPoints { get; set; }
    }
}