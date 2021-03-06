﻿namespace Olimp.DAL.Models
{
    public class Player
    {
        public string PlayerId { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string MiddleName { get; set; }
        public int Number { get; set; }
    }

    public class PlayerAdmin
    {
        public string PlayerId { get; set; }
        public string CommandId { get; set; }
        public string Surname { get; set; }
    }
}