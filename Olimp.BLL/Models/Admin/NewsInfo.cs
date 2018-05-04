namespace Olimp.BLL.Models
{
    public class NewsInfo
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Date { get; set; }
        public int Type { get; set; }
        public bool Top { get; set; }
        public bool Active { get; set; }
    }
}