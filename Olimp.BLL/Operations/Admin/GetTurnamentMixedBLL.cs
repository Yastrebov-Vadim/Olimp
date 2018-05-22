using Olimp.BLL.Models;
using Olimp.BLL.Models.Response;
using Olimp.DAL.Assest;
using System;
using System.Collections.Generic;

namespace Olimp.BLL.Operations
{
    public class GetTurnamentMixedBLL
    {
        public static GetMixedTurnamentResponse Execute(ElementRequest request)
        {
            var turnamentId = Guid.Parse(request.Txt);
            var turnament = DbHelper.GetTurnament(turnamentId);
            var commands = DbHelper.GetCommandForTurnament(turnamentId, true);
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

            var turnamentGroups = turnament.step > 1 ? GetTurnamentGroupsBLL.Execute(turnamentId) : new List<TurnamentGroups>();

            var item = new MixedTurnamentAdmin
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
                TurnamentGroups = turnamentGroups
            };

            return new GetMixedTurnamentResponse { Turnament = item };
        }
    }
}
