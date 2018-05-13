using Olimp.BLL.Assest;
using Olimp.BLL.Models;
using Olimp.BLL.Models.Response;
using Olimp.DAL.Assest;
using System;

namespace Olimp.BLL.Operations
{
    public class DeclareTournamentBLL
    {
        public static ElementResponse Execute(ElementRequest request, string commandId, string commandName, string OlimpEmail)
        {
            DbHelper.CheckCountCommand(Guid.Parse(commandId));
            DbHelper.DeclareTournament(Guid.Parse(request.Txt), Guid.Parse(commandId));
           
            SendEmailBLL.SendEmail("Заявка на турнир", $"Команда \"{commandName}\": подала заявку на участие в турнире -  \"{DbHelper.GetTurnamentName(Guid.Parse(request.Txt))}\"", OlimpEmail);

            return new ElementResponse { Txt = commandName };
        }
    }
}
