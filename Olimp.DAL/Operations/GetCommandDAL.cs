using Olimp.BLL.Assest;
using Olimp.DAL.Models;
using Olimp.DAL.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Olimp.DAL.Operations
{
    public class GetCommandDAL
    {
        public static GetCommandsResponse Execute()
        {
            var commands = DbHelper.GetCommand();
            var commandsItem = new List<Command>();

            foreach (var command in commands)
            {
                var players = DbHelper.GetPlayerForCommand(command.id);
                var playersItem = new List<Player>();

                foreach (var player in players)
                {
                    var playerItem = new Player
                    {
                        MiddleName = player.middleName,
                        Name = player.middleName,
                        Number = player.number,
                        PlayerId = player.id.ToString(),
                        Surname = player.surname
                    };

                    playersItem.Add(playerItem);
                }

                Command commandElement = new Command
                {
                    Name = command.command_name,
                    Foto = command.foto,
                    Players = playersItem
                };

                commandsItem.Add(commandElement);

            }

            return new GetCommandsResponse { Commands = commandsItem };
        }
    }
}
