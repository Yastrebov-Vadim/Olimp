using Olimp.BLL.Assest;
using Olimp.DAL.Models;
using Olimp.DAL.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Olimp.DAL.Operations
{
    public class GetCommandFilterDAL
    {
        public static GetCommandFilterResponse Execute()
        {
            var commands = DbHelper.GetCommand();
            var commandsFilterItem = new List<CommandFilter>();

            foreach (var command in commands)
            {
                var commandFilter = new CommandFilter
                {
                    Name = command.command_name,
                    Id = command.foto
                };

                commandsFilterItem.Add(commandFilter);
            }

            return new GetCommandFilterResponse { CommandFilter = commandsFilterItem };
        }
    }
}
