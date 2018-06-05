using Olimp.BLL.Models;
using Olimp.DAL.Assest;
using Olimp.DAL.DTO;
using System;
using System.Linq;
using System.Collections.Generic;

namespace Olimp.BLL.Operations
{
    public class CalculatePlayOffBLL
    {
        public static void Execute(ElementRequest request)
        {
            var turnamentId = Guid.Parse(request.Txt);
            var groups = DbHelper.GetTurnamentGroups(turnamentId);
            var commands = new List<position_command_for_turnament>();
            var circlePositionCommand = new List<List<position_command_for_turnament>>();

            groups.ForEach(x =>
            {
                var position = DbHelper.GetPositionTopForGroup(turnamentId, x.id_group_for_turnament);
                position.ForEach(p =>
                {
                    commands.Add(p);
                });
            });

            var countCircle = 0;
            for (var p = 1; p < groups.Count * 2; p = p * 2)
            {
                circlePositionCommand.Add(new List<position_command_for_turnament>());
                countCircle++;
            }

            circlePositionCommand.Add(new List<position_command_for_turnament>());
            countCircle++;

            for (var i = 0; i < countCircle; i++)
            {
                var circleId = DbHelper.AddCircleForTurmament(turnamentId, i + 1);

                if (i == countCircle - 1)
                {
                    var command = new position_command_for_turnament
                    {
                        id_account = Guid.Empty,
                        command_name = "?"
                    };

                    circlePositionCommand[i].Add(command);
                }

                if (i == 0)
                {
                    if (commands.Count % 4 == 0)
                    {
                        commands.ForEach(x =>
                        {
                            circlePositionCommand[i].Add(x);
                        });

                    }
                    else
                    {
                        for (var j = 0; j < Math.Pow(2, countCircle - 1); j++)
                        {
                            circlePositionCommand[i].Add(commands[j]);
                        }
                    }
                }

                if (i == 1)
                {
                    if (commands.Count % 4 == 0)
                    {
                        for (var j = 0; j < circlePositionCommand[i - 1].Count / 2; j++)
                        {
                            var command = new position_command_for_turnament
                            {
                                id_account = Guid.Empty,
                                command_name = "?"
                            };
                            circlePositionCommand[i].Add(command);
                        }
                    }
                    else
                    {
                        for (var j = 0; j < commands.Count - circlePositionCommand[i - 1].Count; j++)
                        {
                            circlePositionCommand[i].Add(commands[commands.Count - j - 1]);
                        }

                        for (var j = 0; j < circlePositionCommand[i - 1].Count / 2; j++)
                        {
                            var command = new position_command_for_turnament
                            {
                                id_account = Guid.Empty,
                                command_name = "?"
                            };
                            circlePositionCommand[i].Add(command);
                        }
                    }
                }

                if (i > 1 && i != countCircle - 1)
                {
                    for (var j = 0; j < circlePositionCommand[i - 1].Count / 2; j++)
                    {
                        var command = new position_command_for_turnament
                        {
                            id_account = Guid.Empty,
                            command_name = "?"
                        };

                        circlePositionCommand[i].Add(command);
                    }
                }

                for (var j = 0; j < circlePositionCommand[i].Count; j++)
                {
                    DbHelper.CreatePositionCommand(circlePositionCommand[i][j], circleId);
                }
            }

            var circle = DbHelper.GetCircleForTurnament(turnamentId);
            circle.Sort((a, b) => a.numbr_circle <= b.numbr_circle ? -1 : 1);

            circle.ForEach(x =>
            {
                var positoinCommands = DbHelper.GetPositionCommand(x.id_circle_for_turnament);
                if (x != circle.Last())
                    for (var j = 0; j < positoinCommands.Count; j = j + 2)
                    {
                        DbHelper.CreateGameForTurnament(x.id_circle_for_turnament, positoinCommands[j].id_account, positoinCommands[j + 1].id_account, positoinCommands[j].command_name, positoinCommands[j + 1].command_name, x.numbr_circle, false);
                    }
            });
        }
    }
}
