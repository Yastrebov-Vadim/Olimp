using Olimp.BLL.Models;
using Olimp.BLL.Models.Response;
using Olimp.BLL.Operations;
using System.Configuration;
using System.Web.Http;

namespace OlympusPortal.Controllers.API
{
    public class TurnamentController : ApiBaseController
    {
        [HttpPost]
        public GetTurnamentsForUserResponse GetTurnamentsForUser(ElementTypeRequest request) => GetTurnamentsForUserBLL.Execute(request);

        [Authorize]
        [HttpPost]
        public ElementResponse DeclareTournament(ElementRequest request) => DeclareTournamentBLL.Execute(request, GetAccountId(), GetAccountName(), ConfigurationManager.AppSettings["OlimpEmail"]);
    }
}

