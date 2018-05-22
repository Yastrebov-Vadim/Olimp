using Olimp.BLL.Models;
using Olimp.BLL.Models.Response;
using Olimp.DAL.Assest;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Olimp.BLL.Operations
{
    public class GetPositionCommandBLL
    {
        public static List<PositionCommand> Execute(Guid turnamentId)
        {
            var positionCommands = new List<PositionCommand>();

            var positions = DbHelper.GetPositionCommand(turnamentId);

            positions.Sort((a, b) => a.place <= b.place ? -1 : 1);

            if (positions.Any())
            {
                foreach (var element in positions)
                {
                    var position = new PositionCommand
                    {
                        Id = element.id.ToString(),
                        CommandName = element.command_name,
                        Position = element.position,
                        CommandId = element.id_command.ToString(),
                        Place = element.place,
                        Points = element.points,
                        FakeCode = element.fake_code
                    };

                    positionCommands.Add(position);
                };
            };

            return positionCommands;
        }
    }
}
