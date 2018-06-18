using Olimp.BLL.Models;
using Olimp.BLL.Models.Response;
using Olimp.DAL.Assest;
using System.Linq;
using System;
using System.Collections.Generic;

namespace Olimp.BLL.Operations
{
    public class GetStatisticsCommandBLL
    {
        public static StatisticsCommandResponse Execute(string id)
        {
            var accountId = Guid.Parse(id);
            var skipMatch = new List<SkipMatch>();
            var skip = DbHelper.GetSkip(accountId).GroupBy(g => g.id_turnament).ToList();

            skip.ForEach(x =>
            {
                var players = new List<Player>();
                x.ToList().ForEach(p =>
                {
                    var player = DbHelper.GetPlayer(p.id_player);
                    players.Add(new Player
                    {
                        Number = player.number,
                        Name = player.name,
                        Surname = player.surname,
                        MiddleName = player.middleName,
                    });
                });

                skipMatch.Add(new SkipMatch
                {
                    TurnamentName = DbHelper.GetTurnamentName(x.Key),
                    Players = players
                });

            });

            var game = DbHelper.GetGameForCommand(accountId);
            var countGame = game.Count;
            var scoreGoals = DbHelper.GetScoreGoals(accountId);
            var missedGoals = DbHelper.GetMissedGoals(accountId);
            var victory = game.Where(x => (x.id_command_one == accountId && x.command_one_points > x.command_two_points) || (x.id_command_two == accountId && x.command_two_points > x.command_one_points)).ToList().Count;
            var loss = game.Where(x => (x.id_command_one == accountId && x.command_one_points < x.command_two_points) || (x.id_command_two == accountId && x.command_two_points < x.command_one_points)).ToList().Count;
            var draw = game.Where(x => (x.id_command_one == accountId && x.command_one_points == x.command_two_points) || (x.id_command_two == accountId && x.command_two_points == x.command_one_points)).ToList().Count;

            var statisticsCommand = new StatisticsCommand
            {
                SkipMatchs = skipMatch,
                CountGame = countGame,
                ScoreGoals = scoreGoals,
                MissedGoals = missedGoals,
                Victory = victory,
                Loss = loss,
                Draw = draw
            };

            return new StatisticsCommandResponse { StatisticsCommand = statisticsCommand };
        }
    }
}
