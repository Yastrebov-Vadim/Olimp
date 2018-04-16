using System.Collections.Generic;

namespace OlympusPortal.Models.Response
{
    public class GetAccountInfoResponse
    {
        public string Foto { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public List<Player> Command { get; set; }

        public GetAccountInfoResponse(string foto, string name, string phone, string email, List<Player> command)
        {
            Foto = foto;
            Name = name;
            Phone = phone;
            Email = email;
            Command = command;
        }
        public GetAccountInfoResponse()
        {
        }
    }
}