using System.Collections.Generic;

namespace Olimp.BLL.Models
{
    public class NewsBriefly
    {
        public string Foto { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
        public string Date { get; set; }
        public int Type { get; set; }
        public string UrlVideo { get; set; }
        public List<string> UrlFoto { get; set; }
    }
}