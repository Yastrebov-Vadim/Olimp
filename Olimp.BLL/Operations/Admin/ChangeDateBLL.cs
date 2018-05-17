using Olimp.BLL.Models;
using Olimp.DAL.Assest;
using System;

namespace Olimp.BLL.Operations
{
    public class ChangeDateBLL
    {
        public static void Execute(ChangeGameDayRequest request)
        {
            DbHelper.ChangeDate(Guid.Parse(request.TurnamentId), request.Tour, request.StartDate, request.NewStartDate);
        }
    }
}
