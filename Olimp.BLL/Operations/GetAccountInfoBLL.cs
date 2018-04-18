using Olimp.BLL.Models;
using Olimp.BLL.Models.Response;
using Olimp.DAL.Assest;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Olimp.BLL.Operations
{
    public class GetAccountInfoBLL
    {
        public static GetAccountInfoResponse Execute(Guid id)
        {
            var command = DbHelper.GetAccountInfo(id);
            var foto = command.foto ?? "url(./content/img/ava.png)";

            return new GetAccountInfoResponse
            {
                Command = GetPlayerForCommandBLL(id),
                Email = command.email,
                Foto = foto,
                Name = command.command_name,
                Phone = command.mobile
            };
        }

        public static List<Player> GetPlayerForCommandBLL(Guid id)
        {
            var players = DbHelper.GetPlayerForCommand(id);

            List<Player> player = new List<Player>();

            if (players.Any())
            {
                players.ForEach(x =>
                {
                    player.Add(new Player
                    {
                        MiddleName = x.middleName,
                        Name = x.name,
                        Number = x.number,
                        PlayerId = x.id.ToString(),
                        Surname = x.surname
                    });
                });
            }

            player.Sort((a, b) => a.Number <= b.Number ? -1 : 1);

            return player;
        }
    }
}
