using Olimp.BLL.Assest;
using Olimp.BLL.Models;
using Olimp.DAL.Assest;
using Olimp.DAL.DTO;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Olimp.BLL.Operations
{
    public class CloseTourBLL
    {
        public static void Execute(TourStepRequest request)
        {
            var turnamentName = string.Empty;
            var turnamentId = Guid.Parse(request.TurnamentId);
            var game = new List<game_for_turnament>();

            switch (request.TurnamentType)
            {
                case 1:
                    game = DbHelper.CloseTour(turnamentId, request.Tour);
                    turnamentName = DbHelper.GetTurnamentName(turnamentId);
                    break;
                case 2:
                    game = DbHelper.CloseTour(turnamentId, request.Tour);
                    turnamentName = DbHelper.GetTurnamentNameForGroup(turnamentId);
                    break;
                case 3:
                    var circleId = Guid.Parse(request.CircleId);
                    game = DbHelper.CloseTour(circleId);
                    turnamentName = DbHelper.GetTurnamentNameForPlayOff(circleId);
                    CreateGameNewTour(turnamentId, circleId);
                    break;
            };

            CalculatePosition(Guid.Parse(request.TurnamentId));
            game.ForEach(x =>
            {
                SendEmailBLL.SendEmail("Окончание тура", $"{request.Tour} тур, в турнире \"{turnamentName}\" завершен", DbHelper.GetAccountEmail(x.id_command_one));
                SendEmailBLL.SendEmail("Окончание тура", $"{request.Tour} тур, в турнире \"{turnamentName}\" завершен", DbHelper.GetAccountEmail(x.id_command_two));
            });
        }

        public static void CalculatePosition(Guid turnamentId)
        {
            var position = DbHelper.GetPositionCommand(turnamentId);
            var game = DbHelper.GetGameForTurnament(turnamentId);

            position.Sort((a, b) => a.points <= b.points ? 1 : -1);

            var groupPosition = position.GroupBy(x => x.points).ToList();

            var positionPoints = new List<List<List<position_command_for_turnament>>>();

            groupPosition.ForEach(x =>
            {
                if (x.Count() > 1)
                {
                    var positions = CalculatePositionGroup(turnamentId, game, x.ToList());
                    positionPoints.Add(positions);
                }
                else
                {
                    var positions = new List<List<position_command_for_turnament>>();
                    positions.Add(x.ToList());
                    positionPoints.Add(positions);
                }
            });

            var place = 1;

            for (var i = 0; i < positionPoints.Count; i++)
            {
                for (var j = 0; j < positionPoints[i].Count; j++)
                {
                    for (var g = 0; g < positionPoints[i][j].Count; g++)
                    {
                        DbHelper.SavePlaceCommand(turnamentId, positionPoints[i][j][g].id_command, place);
                    }

                    place++;
                }
            }
        }

        public static List<List<position_command_for_turnament>> CalculatePositionGroup(Guid turnamentId, List<game_for_turnament> game, List<position_command_for_turnament> commands)
        {
            var response = new List<List<position_command_for_turnament>>();

            var newPosition = new List<position_command_for_turnament>();

            commands.ForEach(x =>
            {
                var position = new position_command_for_turnament
                {
                    id_command = x.id_command,
                    points = 0,
                };

                var points = 0;

                game.ForEach(g =>
                {
                    commands.ForEach(c =>
                    {
                        if (g.id_command_one == x.id_command && g.id_command_two == c.id_command)
                            points += g.command_one_points;
                        if (g.id_command_two == x.id_command && g.id_command_one == c.id_command)
                            points += g.command_two_points;
                    });
                });

                position.points = points;
                newPosition.Add(position);
            });

            newPosition.Sort((a, b) => a.points <= b.points ? 1 : -1);
            var groupNewPosition = newPosition.GroupBy(x => x.points).ToList();

            if (groupNewPosition.Count() == 1)
                response.Add(CalculatePositionLine(turnamentId, game, groupNewPosition.First().ToList()));
            else
            {
                groupNewPosition.ForEach(x =>
                {
                    if (x.Count() == 1)
                        response.Add(x.ToList());
                    else
                    {
                        var listPosition = CalculatePositionGroup(turnamentId, game, x.ToList());
                        listPosition.ForEach(w =>
                        {
                            response.Add(w);
                        });
                    }
                });
            }

            return response;
        }

        public static List<position_command_for_turnament> CalculatePositionLine(Guid turnamentId, List<game_for_turnament> game, List<position_command_for_turnament> commands)
        {
            var response = new List<position_command_for_turnament>();

            var newPosition = new List<position_command_for_turnament>();

            commands.ForEach(x =>
            {
                var position = new position_command_for_turnament
                {
                    id_command = x.id_command,
                    command_name = x.command_name,
                    points = 0,
                };

                var goals = 0;

                game.ForEach(g =>
                {
                    commands.ForEach(c =>
                    {
                        var commandOne = DbHelper.GetGoalsCommandForTurnament(turnamentId, g.id_command_one, g.id);
                        var commandTwo = DbHelper.GetGoalsCommandForTurnament(turnamentId, g.id_command_two, g.id);

                        if (g.id_command_one == x.id_command && g.id_command_two == c.id_command)
                            goals += commandOne.Count - commandTwo.Count;
                        if (g.id_command_two == x.id_command && g.id_command_one == c.id_command)
                            goals += commandTwo.Count - commandOne.Count;
                    });
                });

                position.points = goals;
                newPosition.Add(position);
            });

            newPosition.Sort((a, b) => a.points <= b.points ? 1 : -1);

            var groupNewPosition = newPosition.GroupBy(x => x.points).ToList();

            var i = 0;
            groupNewPosition.ForEach(x =>
            {
                x.ToList().ForEach(g =>
                {
                    g.place = i;
                    response.Add(g);
                });

                i++;
            });

            return response;
        }

        public static void CreateGameNewTour(Guid turnamentId, Guid circleId)
        {
            var circle = DbHelper.GetCircleForTurnament(turnamentId);
            circle.Sort((a, b) => a.numbr_circle <= b.numbr_circle ? -1 : 1);
            var commands = DbHelper.GetCommandGoNewTour(circleId);
            var circleNextId = Guid.Empty;

            for(var i = 0; i < circle.Count - 1; i++)
            {
                if (circle[i].id == circleId)
                    circleNextId = circle[i+1].id;
            }

            if (circleNextId == Guid.Empty)
                return;

            DbHelper.SetCommandForNewTour(circleNextId, commands);
            DbHelper.SetPositionCommandForNewTour(circleNextId, commands);
        }
    }
}
