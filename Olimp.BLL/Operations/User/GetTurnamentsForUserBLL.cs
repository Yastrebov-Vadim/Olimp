using Olimp.BLL.Models;
using Olimp.BLL.Models.Response;
using Olimp.DAL.Assest;
using System.Collections.Generic;

namespace Olimp.BLL.Operations
{
    public class GetTurnamentsForUserBLL
    {
        public static GetTurnamentsForUserResponse Execute(ElementTypeRequest request)
        {
            var turnaments = DbHelper.GetTurnamentsForUser(request.Type);

            var response = new GetTurnamentsForUserResponse { Turnaments = new List<Turnament>() };

            foreach (var item in turnaments)
            {
                var positionCommands = item.step > 1 && item.type == 1 ? GetPositionCommandBLL.Execute(item.id) : new List<PositionCommand>();
                var groupTourNumber = item.step > 1 && item.type == 1 ? GetGroupTourNumberBLL.Execute(item.id) : new List<GroupTourNumber>();
                var turnamentGroups = item.step > 1 && item.type == 2 ? GetTurnamentGroupsBLL.Execute(item.id) : new List<TurnamentGroups>();

                var commands = DbHelper.GetCommandForTurnament(item.id, true);
                var commandsForTurnament = new List<CommandForTurnament>();

                foreach (var command in commands)
                {
                    var commandForTurnament = new CommandForTurnament
                    {
                        Name = command.Name,
                        Status = command.Status
                    };

                    commandsForTurnament.Add(commandForTurnament);
                }

                groupTourNumber.Sort((a, b) => a.NumberTour <= b.NumberTour ? -1 : 1);

                var turnament = new Turnament
                {
                    Id = item.id.ToString(),
                    ContributionGame = item.сontribution_game,
                    ContributionTournament = item.сontribution_tournament,
                    DateEnd = item.date_end == null ? null : item.date_end.Value.ToShortDateString(),
                    DateStart = item.date_start == null ? null : item.date_start.Value.ToShortDateString(),
                    Description = item.description,
                    Name = item.name,
                    Commands = commandsForTurnament,
                    Type = item.type,
                    PositionCommand = positionCommands,
                    GroupTourNumber = groupTourNumber,
                    TurnamentGroups = turnamentGroups
                };

                response.Turnaments.Add(turnament);
            };

            return response;
        }
    }
}
