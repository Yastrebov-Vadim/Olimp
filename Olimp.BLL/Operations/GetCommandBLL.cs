using Olimp.BLL.Models;
using Olimp.BLL.Models.Response;
using Olimp.DAL.Assest;
using System.Collections.Generic;

namespace Olimp.BLL.Operations
{
    public class GetCommandBLL
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
