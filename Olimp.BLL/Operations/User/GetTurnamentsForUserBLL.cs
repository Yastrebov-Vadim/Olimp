using Olimp.BLL.Models;
using Olimp.BLL.Models.Response;
using Olimp.DAL.Assest;
using System.Collections.Generic;

namespace Olimp.BLL.Operations
{
    public class GetTurnamentsForUserBLL
    {
        public static GetTurnamentsForUserResponse Execute()
        {
            var turnaments = DbHelper.GetTurnamentsForUser();

            var response = new GetTurnamentsForUserResponse { Turnaments = new List<Turnament>() };

            foreach (var item in turnaments)
            {
                var commands = DbHelper.GetCommandForTurnament(item.id);
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
                var turnament = new Turnament
                {
                    Id = item.id.ToString(),
                    ContributionGame = item.сontribution_game,
                    ContributionTournament = item.сontribution_tournament,
                    DateEnd = item.date_end == null ? null : item.date_end.Value.ToShortDateString(),
                    DateStart = item.date_start == null ? null : item.date_start.Value.ToShortDateString(),
                    Description = item.description,
                    Name = item.name,
                    Commands = commandsForTurnament
                };

                response.Turnaments.Add(turnament);
            };

            return response;
        }
    }
}
