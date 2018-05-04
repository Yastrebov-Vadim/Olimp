namespace Olimp.BLL.Models
{
    public class SaveNewsRequest
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
        public bool Top { get; set; }
        public string CommandOne { get; set; }
        public string CommandTwo { get; set; }
    }
}