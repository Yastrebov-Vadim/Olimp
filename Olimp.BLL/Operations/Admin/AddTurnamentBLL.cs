using Olimp.BLL.Models;
using Olimp.BLL.Models.Response;
using Olimp.DAL.Assest;
using System;

namespace Olimp.BLL.Operations
{
    public class AddTurnamentBLL
    {
        public static ElementTypeResponse Execute(ElementRequest request)
        {
            var turnament = DbHelper.AddTurnament(Convert.ToInt32(request.Txt));

            return new ElementTypeResponse { Id = turnament.id.ToString(), Type = turnament.type };
        }
    }
}
