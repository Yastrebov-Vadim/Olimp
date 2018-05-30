using Olimp.BLL.Models;
using Olimp.BLL.Models.Response;
using Olimp.DAL.Assest;
using System.Collections.Generic;

namespace Olimp.BLL.Operations
{
    public class GetTurnamentsBLL
    {
        public static GetTurnamentsForUserResponse Execute(ElementTypeRequest request)
        {
            var turnaments = DbHelper.GetTurnaments(request.Type);

            var response = new GetTurnamentsForUserResponse { Turnaments = new List<Turnament>() };

            foreach (var item in turnaments)
            {
                var positionCommands = item.step > 1 && item.type == 1 ? GetPositionCommandBLL.Execute(item.id) : new List<PositionCommand>();
                var groupTourNumber = item.step > 1 && item.type == 1 ? GetGroupTourNumberBLL.Execute(item.id, false) : new List<GroupTourNumber>();
                var turnamentGroups = item.step > 1 && item.type == 2 ? GetTurnamentGroupsBLL.Execute(item.id, false) : new List<TurnamentGroups>();
                var turnamentPlayOff = new List<TurnamentPlayOff>();
                var positionPlayOff = new List<List<PositionCommand>>();

                if (item.step > 1 && item.type == 2)
                {
                    var tuple = GetPositionPlayOffBLL.Execute(item.id, false);
                    turnamentPlayOff = tuple.Item1;
                    positionPlayOff = tuple.Item2;
                }

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
                    TurnamentGroups = turnamentGroups,
                    TurnamentPlayOff = turnamentPlayOff,
                    PositionPlayOff = positionPlayOff
                };

                response.Turnaments.Add(turnament);
            };

            return response;
        }
    }
}
