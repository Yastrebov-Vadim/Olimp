using Olimp.BLL.Assest;
using Olimp.BLL.Models;
using Olimp.DAL.Assest;
using System;

namespace Olimp.BLL.Operations
{
    public class AcceptDeclareBLL
    {
        public static void Execute(DeclareRequest request)
        {
            DbHelper.AcceptDeclare(Guid.Parse(request.TurnamentId), Guid.Parse(request.CommandId));
            SendEmailBLL.SendEmail("Решение по заявке на турнир", $"Ваша заявка на участие в турнире \"{DbHelper.GetTurnamentName(Guid.Parse(request.TurnamentId))} одобрена", DbHelper.GetAccountEmail(Guid.Parse(request.CommandId)));
        }
    }
}
