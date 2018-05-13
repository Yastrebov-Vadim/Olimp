using Olimp.BLL.Models;
using Olimp.BLL.Models.Response;
using Olimp.DAL.Assest;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Olimp.BLL.Operations
{
    public class GetTurnamentBLL
    {
        public static GetTurnamentResponse Execute(ElementRequest request)
        {
            var turnament = DbHelper.GetTurnament(Guid.Parse(request.Txt));

            var commands = DbHelper.GetCommandForTurnament(Guid.Parse(request.Txt));
            var commandsForTurnament = new List<CommandForTurnament>();

            foreach (var command in commands)
            {
                var commandForTurnament = new CommandForTurnament
                {
                    Id = command.Id,
                    Name = command.Name,
                    Status = command.Status
                };

                commandsForTurnament.Add(commandForTurnament);
            }

            var positionCommands = new List<PositionCommand>();
            var gameTurnament = new List<GameTurnament>();

            if (turnament.step > 1)
            {
                var positions = DbHelper.GetPositionCommand(Guid.Parse(request.Txt));

                positions.Sort((a, b) => a.position <= b.position ? -1 : 1);

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
                            Points = element.points
                        };

                        positionCommands.Add(position);
                    };
                };

                var games = DbHelper.GetGameForTurnament(Guid.Parse(request.Txt));

                if (games.Any())
                {
                    foreach (var element in games)
                    {
                        var game = new GameTurnament
                        {
                            Id = element.id.ToString(),
                            IdCommandOne = element.id_command_one.ToString(),
                            IdCommandTwo = element.id_command_two.ToString(),
                            CommandOneGoals = element.command_one_goals,
                            CommandTwoGoals = element.command_two_goals,
                            CommandOnePoints = element.command_one_points,
                            CommandTwoPoints = element.command_two_points,
                            Tour =element.number_tour,
                            DateStart = element.date_start
                        };

                        gameTurnament.Add(game);
                    };
                };
            };

            var item = new TurnamentAdmin
            {
                Id = turnament.id.ToString(),
                Name = turnament.name,
                DateStart = turnament.date_start,
                DateEnd = turnament.date_end,
                Type = turnament.type,
                StateCode = turnament.state_code,
                Step = turnament.step,
                Description = turnament.description,
                ContributionGame = turnament.сontribution_game,
                ContributionTournament = turnament.сontribution_tournament,
                Commands = commandsForTurnament,
                PositionCommand = positionCommands,
                GameTurnament = gameTurnament
            };

            var response = new GetTurnamentResponse { Turnament = item };

            return response;
        }
    }
}
