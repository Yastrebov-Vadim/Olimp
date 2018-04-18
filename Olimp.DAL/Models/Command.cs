using System.Collections.Generic;

namespace Olimp.DAL.Models
{
    public class Command
    {
        public string Name { get; set; }
        public string Foto { get; set; }
        public List<Player> Players { get; set; }
    }
}