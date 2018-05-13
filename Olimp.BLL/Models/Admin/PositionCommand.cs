namespace Olimp.BLL.Models
{
    public class PositionCommand
    {
        public string Id { get; set; }
        public int Position { get; set; }
        public string CommandId { get; set; }
        public string CommandName { get; set; }
        public int Points { get; set; }
        public int Place { get; set; }
    }
}