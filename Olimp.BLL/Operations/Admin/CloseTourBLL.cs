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
            DbHelper.CloseTour(Guid.Parse(request.TurnamentId), request.Tour);
            CalculatePosition(Guid.Parse(request.TurnamentId));
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
                    var positions = CalculatePositionGroup(game, x.ToList());
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
                        place++;
                    }
                }
            }
        }

        public static List<List<position_command_for_turnament>> CalculatePositionGroup(List<game_for_turnament> game, List<position_command_for_turnament> commands)
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
                response.Add(CalculatePositionLine(game, groupNewPosition.First().ToList()));
            else
            {
                groupNewPosition.ForEach(x =>
                {
                    if (x.Count() == 1)
                        response.Add(x.ToList());
                    else
                    {
                        var listPosition = CalculatePositionGroup(game, x.ToList());
                        listPosition.ForEach(w =>
                        {
                            response.Add(w);
                        });
                    }
                });
            }

            return response;
        }

        public static List<position_command_for_turnament> CalculatePositionLine(List<game_for_turnament> game, List<position_command_for_turnament> commands)
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
                        if (g.id_command_one == x.id_command && g.id_command_two == c.id_command)
                            goals += g.command_one_goals - g.command_two_goals;
                        if (g.id_command_two == x.id_command && g.id_command_one == c.id_command)
                            goals += g.command_two_goals - g.command_one_goals;
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
    }
}
