using Olimp.BLL.Assest;
using Olimp.BLL.Models;
using Olimp.DAL.Assest;
using System;

namespace Olimp.BLL.Operations
{
    public class RemoveDeclareBLL
    {
        public static void Execute(RemoveDeclareRequest request)
        {
            DbHelper.RemoveDeclare(Guid.Parse(request.TurnamentId), Guid.Parse(request.CommandId));
            SendEmailBLL.SendEmail("Отказ в заявке на участие", $"Участие в турнире \"{DbHelper.GetTurnamentName(Guid.Parse(request.TurnamentId))} отклонено по причине - \"{request.Cause}\"", DbHelper.GetAccountEmail(Guid.Parse(request.CommandId)));
        }
    }
}
