﻿using System.Collections.Generic;

namespace Olimp.BLL.Models
{
    public class Command
    {
        public string Name { get; set; }
        public string Photo { get; set; }
        public List<Player> Players { get; set; }
    }
}