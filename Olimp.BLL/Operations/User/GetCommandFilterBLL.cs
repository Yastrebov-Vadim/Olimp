using Olimp.BLL.Models;
using Olimp.BLL.Models.Response;
using Olimp.DAL.Assest;
using System.Collections.Generic;

namespace Olimp.BLL.Operations
{
    public class GetCommandFilterBLL
    {
        public static GetCommandFilterResponse Execute()
        {
            var commands = DbHelper.GetCommand();
            var commandsFilterItem = new List<CommandsFilter>();

            foreach (var command in commands)
            {
                var commandFilter = new CommandsFilter
                {
                    Name = command.command_name,
                    Id = command.id.ToString()
                };

                commandsFilterItem.Add(commandFilter);
            }

            return new GetCommandFilterResponse { CommandFilter = commandsFilterItem };
        }
    }
}
