using Olimp.BLL.Models;
using Olimp.BLL.Models.Response;
using Olimp.DAL.Assest;
using System;

namespace Olimp.BLL.Operations
{
    public class AddPlayerBLL
    {
        public static ElementResponse Execute(Guid id, PlayerRequest request)
        {
            DbHelper.CheckAddPlayer(id, request.Number);

            var playerId = DbHelper.AddPlayer(id, request.MiddleName, request.Name, request.Surname, request.Number);

            return new ElementResponse { Txt = playerId };
        }
    }
}
