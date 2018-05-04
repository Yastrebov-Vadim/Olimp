using System.Collections.Generic;

namespace Olimp.DAL.Models
{
    public class FullNews
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
        public string Date { get; set; }
        public int Type { get; set; }
        public string UrlVideo { get; set; }
        public List<string> UrlPhoto { get; set; }
    }
}