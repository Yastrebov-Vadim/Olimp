using Olimp.BLL.Models;
using Olimp.DAL.Assest;
using System;

namespace Olimp.BLL.Operations
{
    public class ChangeArenaBLL
    {
        public static void Execute(ChangeGameDayRequest request)
        {
            DbHelper.ChangeArena(Guid.Parse(request.TurnamentId),request.Tour, request.StartDate, Guid.Parse(request.Arena));
        }
    }
}
