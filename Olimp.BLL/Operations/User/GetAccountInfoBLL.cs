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

            return new GetAccountInfoResponse
            {
                Command = GetPlayerForCommandBLL(id),
                Email = command.email,
                Photo = DbHelper.GetAccountAvatar(command.id_account),
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
                        PlayerId = x.id_player.ToString(),
                        Surname = x.surname
                    });
                });
            }

            player.Sort((a, b) => a.Number <= b.Number ? -1 : 1);

            return player;
        }
    }
}
