using System.Collections.Generic;

namespace Olimp.BLL.Models
{
    public class StatisticsCommand
    {
        public List<SkipMatch> SkipMatchs { get; set; }
        public int ScoreGoals { get; set; }
        public int CountGame { get; set; }
        public int MissedGoals { get; set; }
        public int Victory { get; set; }
        public int Loss { get; set; }
        public int Draw { get; set; }
    }
}