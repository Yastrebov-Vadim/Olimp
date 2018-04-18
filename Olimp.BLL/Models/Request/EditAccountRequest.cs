using System;
using System.Collections.Generic;

namespace Olimp.BLL.Models
{
    public class EditAccountRequest
    {
        public string Foto { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public List<Player> Command { get; set; }
    }
}