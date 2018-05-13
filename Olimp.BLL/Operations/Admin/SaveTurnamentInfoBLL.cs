using Olimp.BLL.Models;
using Olimp.DAL.Assest;

namespace Olimp.BLL.Operations
{
    public class SaveTurnamentInfoBLL
    {
        public static void Execute(SaveTurnamentInfoRequest request)
        {
            DbHelper.SaveTurnamentInfo(request.Turnament.Id, request.Turnament.Name, request.Turnament.Description, request.Turnament.Type, request.Turnament.ContributionTournament, request.Turnament.ContributionGame, request.Turnament.DateStart);
        }
    }
}
