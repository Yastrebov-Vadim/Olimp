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
                            int? value = null;
                            if (element.status_code != 0)
                                value = 0;

                            var commandOneGoals = new Goals { Value = value, Goal = new List<Goal>() };
                            var commandTwoGoals = new Goals { Value = value, Goal = new List<Goal>() };
                            var commandOneGoalsDb = DbHelper.GetGoalsCommandForTurnament(turnamentId, element.id_command_one, element.id_game_for_turnament);
                            var commandTwoGoalsDb = DbHelper.GetGoalsCommandForTurnament(turnamentId, element.id_command_two, element.id_game_for_turnament);
                            var commandOneCard = new Cards { Value = null, Card = new List<Card>() };
                            var commandTwoCard = new Cards { Value = null, Card = new List<Card>() };
                            var commandOneCardDb = DbHelper.GetCardCommandForTurnament(turnamentId, element.id_command_one, element.id_game_for_turnament);
                            var commandTwoCardDb = DbHelper.GetCardCommandForTurnament(turnamentId, element.id_command_two, element.id_game_for_turnament);

                            if (commandOneGoalsDb.Count != 0)
                                commandOneGoals.Value = commandOneGoalsDb.Count;

                            commandOneGoalsDb.ForEach(x =>
                            {
                                commandOneGoals.Goal.Add(new Goal
                                {
                                    Id = x.id_goal.ToString(),
                                    TurnamentId = x.id_turnament.ToString(),
                                    PlayerId = x.id_player.ToString(),
                                    PlayerSurname = DbHelper.GetPlayerName(x.id_player),
                                    Time = x.time
                                });
                            });
                            if (commandTwoGoalsDb.Count != 0)
                                commandTwoGoals.Value = commandTwoGoalsDb.Count;
                            commandTwoGoalsDb.ForEach(x =>
                            {
                                commandTwoGoals.Goal.Add(new Goal
                                {
                                    Id = x.id_goal.ToString(),
                                    TurnamentId = x.id_turnament.ToString(),
                                    PlayerId = x.id_player.ToString(),
                                    PlayerSurname = DbHelper.GetPlayerName(x.id_player),
                                    Time = x.time
                                });
                            });

                            if (commandOneCardDb.Count != 0)
                                commandOneCard.Value = commandOneCardDb.Count;

                            commandOneCardDb.ForEach(x =>
                            {
                                commandOneCard.Card.Add(new Card
                                {
                                    Id = x.id_foul_card.ToString(),
                                    TurnamentId = x.id_turnament.ToString(),
                                    PlayerId = x.id_player.ToString(),
                                    PlayerSurname = DbHelper.GetPlayerName(x.id_player),
                                    Type = x.type
                                });
                            });
                            if (commandTwoCardDb.Count != 0)
                                commandTwoCard.Value = commandTwoCardDb.Count;
                            commandTwoCardDb.ForEach(x =>
                            {
                                commandTwoCard.Card.Add(new Card
                                {
                                    Id = x.id_foul_card.ToString(),
                                    TurnamentId = x.id_turnament.ToString(),
                                    PlayerId = x.id_player.ToString(),
                                    PlayerSurname = DbHelper.GetPlayerName(x.id_player),
                                    Type = x.type
                                });
                            });

                            var game = new GameTurnament
                            {
                                Id = element.id_game_for_turnament.ToString(),
                                IdCommandOne = element.id_command_one.ToString(),
                                IdCommandTwo = element.id_command_two.ToString(),
                                CommandOneName = element.command_one_name,
                                CommandTwoName = element.command_two_name,
                                CommandOneGoals = commandOneGoals,
                                CommandTwoGoals = commandTwoGoals,
                                CommandOneCard = commandOneCard,
                                CommandTwoCard = commandTwoCard,
                                CommandOnePoints = element.command_one_points,
                                CommandTwoPoints = element.command_two_points,
                                Tour = element.number_tour,
                                DateStart = element.date_start,
                                Arena = isAdmin ? element.id_game_arena.ToString() : DbHelper.GetArenaName(element.id_game_arena),
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
