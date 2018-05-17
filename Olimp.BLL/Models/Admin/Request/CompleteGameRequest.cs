namespace Olimp.BLL.Models
{
    public class CompleteGameRequest
    {
        public string TurnamentId { get; set; }
        public string GameId { get; set; }
        public int CommandOneGoals { get; set; }
        public int CommandTwoGoals { get; set; }
    }
}