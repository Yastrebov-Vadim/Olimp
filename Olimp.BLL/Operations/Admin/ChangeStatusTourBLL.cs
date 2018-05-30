using Olimp.BLL.Assest;
using Olimp.BLL.Models;
using Olimp.DAL.Assest;
using System;

namespace Olimp.BLL.Operations
{
    public class ChangeStatusTourBLL
    {
        public static void Execute(TourStepRequest request)
        {
            var turnamentName = string.Empty;
            switch (request.TurnamentType)
            {
                case 1:
                    turnamentName = DbHelper.GetTurnamentName(Guid.Parse(request.TurnamentId));
                    break;
                case 2:
                    turnamentName = DbHelper.GetTurnamentNameForGroup(Guid.Parse(request.TurnamentId));
                    break;
                case 3:
                    turnamentName = DbHelper.GetTurnamentNameForPlayOff(Guid.Parse(request.TurnamentId));
                    break;
            };

            NotificationCommandForActive(Guid.Parse(request.TurnamentId), request.Tour, request.Step, turnamentName);
        }

        public static void NotificationCommandForActive(Guid turnamentId, int tour, int step, string turnamentName)
        {
            var game = DbHelper.GetGameForTout(turnamentId, tour);

            game.ForEach(x =>
            {
                if (x.date_start == null)
                    throw new ApplicationException("Не установлена дата проведения");
                if (x.id_arena == null)
                    throw new ApplicationException("Не установлено место проведения");
            });

            game.ForEach(x =>
            {
               

                SendEmailBLL.SendEmail("Новый тур", $"{tour} тур, в турнире \"{turnamentName}\" " +
                    $"пройдет - {x.date_start.Value.ToShortDateString()} в {x.date_start.Value.ToShortTimeString()}. " +
                    $"Место проведения тура - {DbHelper.GetArenaName(x.id_arena)} Подробности можно узнать в личном кабинете.", DbHelper.GetAccountEmail(x.id_command_one));
                SendEmailBLL.SendEmail("Новый тур", $"{tour} тур, в турнире \"{turnamentName}\" " +
                    $"пройдет - {x.date_start.Value.ToShortDateString()} в {x.date_start.Value.ToShortTimeString()}. " +
                    $"Место проведения тура - {DbHelper.GetArenaName(x.id_arena)} Подробности можно узнать в личном кабинете.", DbHelper.GetAccountEmail(x.id_command_two));
            });

            DbHelper.ChangeStatusTour(turnamentId, tour, step);
        }
    }
}
