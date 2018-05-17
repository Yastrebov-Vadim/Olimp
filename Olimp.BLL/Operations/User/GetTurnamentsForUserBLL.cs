using Olimp.BLL.Models;
using Olimp.BLL.Models.Response;
using Olimp.DAL.Assest;
using System;
using System.Collections.Generic;
using System.Linq;

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
                var positionCommands = new List<PositionCommand>();
                var groupTourNumber = new List<GroupTourNumber>();

                if (request.Type > 1)
                {
                    var positions = DbHelper.GetPositionCommand(item.id);
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

                    var games = DbHelper.GetGameForTurnament(item.id);

                    if (games.Any())
                    {
                        var groupTours = games.GroupBy(x => x.number_tour).ToList();

                        for (var i = 0; i < groupTours.Count; i++)
                        {
                            var groupsDate = groupTours[i].GroupBy(x => x.date_start).ToList();

                            var groupsDateStart = new List<GroupDateStart>();

                            foreach (var groupDate in groupsDate)
                            {
                                var gamesTurnament = new List<GameTurnament>();

                                foreach (var element in groupDate)
                                {
                                    var game = new GameTurnament
                                    {
                                        Id = element.id.ToString(),
                                        IdCommandOne = element.id_command_one.ToString(),
                                        IdCommandTwo = element.id_command_two.ToString(),
                                        CommandOneName = element.command_one_name,
                                        CommandTwoName = element.command_two_name,
                                        CommandOneGoals = element.command_one_goals,
                                        CommandTwoGoals = element.command_two_goals,
                                        CommandOnePoints = element.command_one_points,
                                        CommandTwoPoints = element.command_two_points,
                                        Tour = element.number_tour,
                                        DateStart = element.date_start,
                                        Arena = DbHelper.GetArenaName(element.id_arena),
                                        Status = element.status_code
                                    };

                                    gamesTurnament.Add(game);
                                };

                                groupsDateStart.Add(new GroupDateStart
                                {
                                    DateStart = gamesTurnament.First().DateStart,
                                    Arena = gamesTurnament.First().Arena,
                                    GameTurnament = gamesTurnament
                                });
                            };

                            groupsDateStart.Sort((a, b) => a.DateStart <= b.DateStart ? -1 : 1);

                            groupTourNumber.Add(new GroupTourNumber
                            {
                                NumberTour = groupsDateStart.First().GameTurnament.First().Tour,
                                Status = groupsDateStart.First().GameTurnament.Min(x => x.Status),
                                GroupDateStart = groupsDateStart
                            });
                        };
                    };
                };

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
                    PositionCommand = positionCommands,
                    GroupTourNumber = groupTourNumber
                };

                response.Turnaments.Add(turnament);
            };

            return response;
        }
    }
}
