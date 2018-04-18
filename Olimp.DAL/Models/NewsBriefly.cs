using System.Collections.Generic;

namespace Olimp.DAL.Models
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

        public NewsBriefly(string foto, string title, string text, string date, int type, string urlVideo, List<string> urlFoto)
        {
            Foto = foto;
            Title = title;
            Text = text;
            Date = date;
            Type = type;
            UrlVideo = urlVideo;
            UrlFoto = urlFoto;
        }

        public NewsBriefly()
        {

        }
    }
}