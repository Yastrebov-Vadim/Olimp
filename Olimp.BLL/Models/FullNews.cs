using System.Collections.Generic;

namespace Olimp.BLL.Models
{
    public class FullNews
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
        public string Date { get; set; }
        public int Type { get; set; }
        public bool Top { get; set; }
        public string UrlVideo { get; set; }
        public List<Photo> Photo { get; set; }
        public string CommandOne { get; set; }
        public string CommandTwo { get; set; }
    }
}