using Olimp.BLL.Models;
using Olimp.DAL.Assest;
using System;
using System.Collections.Generic;

namespace Olimp.BLL.Operations
{
    public class GetPlayerForTurnamentBLL
    {
        public static GetPlayerForTurnamentRequest Execute(ElementRequest request)
        {
            var players = DbHelper.GetPlayerForTurnament(Guid.Parse(request.Txt));

          var response = new GetPlayerForTurnamentRequest { Players = new List<PlayerAdmin>() };

            players.ForEach(x =>
            {
                response.Players.Add(new PlayerAdmin
                {
                    PlayerId = x.PlayerId,
                    CommandId = x.CommandId,
                    Surname =x.Surname
                });
            });

            return response;
        }
    }
}