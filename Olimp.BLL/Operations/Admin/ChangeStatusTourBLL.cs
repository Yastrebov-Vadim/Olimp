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
            if (request.Step == 1)
                NotificationCommandForActive(request);
        }

        public static void NotificationCommandForActive(TourStepRequest request)
        {
            var game = DbHelper.GetGameForTout(Guid.Parse(request.TurnamentId), request.Tour);

            game.ForEach(x =>
            {
                if (x.date_start == null)
                    throw new ApplicationException("Не установлена дата проведения");
                if (x.id_arena == null)
                    throw new ApplicationException("Не установлено место проведения");
            });

            game.ForEach(x =>
            {
                SendEmailBLL.SendEmail("Новый тур", $"{request.Tour} тур, в турнире \"{DbHelper.GetTurnamentName(Guid.Parse(request.TurnamentId))}\" " +
                    $"пройдет - {x.date_start.Value.ToShortDateString()} в {x.date_start.Value.ToShortTimeString()}. " +
                    $"Место проведения тура - {DbHelper.GetArenaName(x.id_arena)} Подробности можно узнать в личном кабинете.", DbHelper.GetAccountEmail(x.id_command_one));
                SendEmailBLL.SendEmail("Новый тур", $"{request.Tour} тур, в турнире \"{DbHelper.GetTurnamentName(Guid.Parse(request.TurnamentId))}\" " +
                    $"пройдет - {x.date_start.Value.ToShortDateString()} в {x.date_start.Value.ToShortTimeString()}. " +
                    $"Место проведения тура - {DbHelper.GetArenaName(x.id_arena)} Подробности можно узнать в личном кабинете.", DbHelper.GetAccountEmail(x.id_command_two));
            });

            DbHelper.ChangeStatusTour(Guid.Parse(request.TurnamentId), request.Tour, request.Step);
        }
    }
}
