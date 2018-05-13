using Olimp.BLL.Models;
using Olimp.DAL.Assest;
using System;

namespace Olimp.BLL.Operations
{
    public class DellTurnamentBLL
    {
        public static void Execute(ElementRequest request)
        {
            DbHelper.DellTurnament(Guid.Parse(request.Txt));
        }
    }
}