using Olimp.BLL.Models;
using Olimp.BLL.Models.Response;
using Olimp.DAL.Assest;
using System.Collections.Generic;

namespace Olimp.BLL.Operations
{
    public class GetTurnamentInfoBLL
    {
        public static TurnamentsInfoResponse Execute()
        {
            var turnaments = DbHelper.GetAllTurnament();

            var response = new TurnamentsInfoResponse { Turnaments = new List<TurnamentsInfo>() };

            if (turnaments == null)
                return response;

            turnaments.Sort((a, b) => a.date_start <= b.date_start ? 1 : -1);
            
            foreach (var turnament in turnaments)
            {
                response.Turnaments.Add(new TurnamentsInfo
                {
                    Id = turnament.id_turnament.ToString(),
                    Name = turnament.name,
                    DateStart = turnament.date_start,
                    DateEnd = turnament.date_end,
                    Type = turnament.type,
                    StateCode = turnament.state_code,
                    Step = turnament.step
                });

            }

            return response;
        }
    }
}
