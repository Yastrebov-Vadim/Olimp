using Olimp.BLL.Models;
using Olimp.BLL.Models.Response;
using Olimp.DAL.Assest;
using System;

namespace Olimp.BLL.Operations
{
    public class AddTurnamentBLL
    {
        public static ElementResponse Execute(ElementRequest request)
        {
            return new ElementResponse { Txt = DbHelper.AddTurnament(Convert.ToInt32(request.Txt)) };
        }
    }
}
