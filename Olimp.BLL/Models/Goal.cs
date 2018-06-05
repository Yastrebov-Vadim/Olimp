namespace Olimp.BLL.Models
{
    public class Goal
    {
        public string Id { get; set; }
        public string TurnamentId { get; set; }
        public string CommandId { get; set; }
        public string GameId { get; set; }
        public string PlayerId { get; set; }
        public string PlayerSurname { get; set; }
        public int Time { get; set; }
    }
}