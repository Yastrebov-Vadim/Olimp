using Olimp.BLL.Assest;
using Olimp.DAL.Models;
using Olimp.DAL.Models.Response;
using System;

namespace Olimp.DAL.Operations
{
    public class AddPlayerDAL
    {
        public static ElementResponse Execute(Guid id, PlayerRequest request)
        {
            var playerRequest = new BLL.Models.PlayerRequest{
                MiddleName = request.MiddleName,
                Name = request.Name,
                Number = request.Number,
                Surname = request.Surname
            };

            var playerId = DbHelper.AddPlayer(id, playerRequest);

            return new ElementResponse(playerId);
        }
    }
}
