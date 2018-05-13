using System;

namespace Olimp.BLL.Models
{
    public class TurnamentsInfo
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public DateTime? DateStart { get; set; }
        public DateTime? DateEnd { get; set; }
        public int Type { get; set; }
        public bool StateCode { get; set; }
        public int Step { get; set; }
    }
}