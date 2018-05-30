using Olimp.BLL.Models;
using Olimp.DAL.Assest;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Olimp.BLL.Operations
{
    public class GetGroupTourNumberBLL
    {
        public static List<GroupTourNumber> Execute(Guid turnamentId, bool isAdmin)
        {
            var games = DbHelper.GetGameForTurnament(turnamentId);
            var groupTourNumber = new List<GroupTourNumber>();

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
                            var commandOneGoals = new Goals { Value = 0, Goal = new List<Goal>() };
                            var commandTwoGoals = new Goals { Value = 0, Goal = new List<Goal>() };
                            var commandOne = DbHelper.GetGoalsCommandForTurnament(turnamentId, element.id_command_one, element.id);
                            var commandTwo = DbHelper.GetGoalsCommandForTurnament(turnamentId, element.id_command_two, element.id);

                            commandOneGoals.Value = commandOne == null ? 0 : commandOne.Count;
                            commandOne.ForEach(x =>
                            {
                                commandOneGoals.Goal.Add(new Goal
                                {
                                    Id = x.id.ToString(),
                                    TurnamentId = x.id_turnament.ToString(),
                                    PlayerId = x.id_player.ToString(),
                                    PlayerSurname = DbHelper.GetPlayerName(x.id_player),
                                    Time = x.time
                                });
                            });
                            commandTwoGoals.Value = commandTwo == null ? 0 : commandTwo.Count;
                            commandTwo.ForEach(x =>
                            {
                                commandTwoGoals.Goal.Add(new Goal
                                {
                                    Id = x.id.ToString(),
                                    TurnamentId = x.id_turnament.ToString(),
                                    PlayerId = x.id_player.ToString(),
                                    PlayerSurname = DbHelper.GetPlayerName(x.id_player),
                                    Time = x.time
                                });
                            });

                            var game = new GameTurnament
                            {
                                Id = element.id.ToString(),
                                IdCommandOne = element.id_command_one.ToString(),
                                IdCommandTwo = element.id_command_two.ToString(),
                                CommandOneName = element.command_one_name,
                                CommandTwoName = element.command_two_name,
                                CommandOneGoals = commandOneGoals,
                                CommandTwoGoals = commandTwoGoals,
                                CommandOnePoints = element.command_one_points,
                                CommandTwoPoints = element.command_two_points,
                                Tour = element.number_tour,
                                DateStart = element.date_start,
                                Arena = isAdmin ? element.id_arena.ToString() : DbHelper.GetArenaName(element.id_arena),
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

            groupTourNumber.Sort((a, b) => a.NumberTour <= b.NumberTour ? -1 : 1);

            return groupTourNumber;
        }
    }
}
