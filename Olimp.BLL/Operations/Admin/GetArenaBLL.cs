using Olimp.BLL.Models;
using Olimp.BLL.Models.Response;
using Olimp.DAL.Assest;
using System.Collections.Generic;

namespace Olimp.BLL.Operations
{
    public class GetArenaBLL
    {
        public static GetArenaResponse Execute()
        {
            var arens = DbHelper.GetArens();
            var response = new GetArenaResponse { Arens = new List<Arena>() };

            arens.ForEach(x =>
            {
                response.Arens.Add(new Arena
                {
                    Id = x.id.ToString(),
                    Name = x.name
                });
            });
            
            return response;
        }
    }
}
