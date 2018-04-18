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
            var playerRequest = new DAL.Models.PlayerRequest{
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
