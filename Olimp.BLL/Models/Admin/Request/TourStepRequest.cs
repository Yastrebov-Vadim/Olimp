namespace Olimp.BLL.Models
{
    public class TourStepRequest
    {
        public string TurnamentId { get; set; }
        public int TurnamentType { get; set; }
        public int Tour { get; set; }
        public int Step { get; set; }
    }
}