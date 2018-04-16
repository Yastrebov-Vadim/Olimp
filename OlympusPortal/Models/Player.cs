using System.Collections.Generic;

namespace OlympusPortal.Models
{
    public class Player
    {
        public string PlayerId { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string MiddleName { get; set; }
        public int Number { get; set; }

        public Player(string playerId, string name, string surname, string middleName, int number)
        {
            PlayerId = playerId;
            Name = name;
            Surname = surname;
            MiddleName = middleName;
            Number = number;
        }
    }
}