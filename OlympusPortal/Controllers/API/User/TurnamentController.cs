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
        public GetTurnamentsForUserResponse GetTurnaments(ElementTypeRequest request) => GetTurnamentsBLL.Execute(request);

        [Authorize]
        [HttpPost]
        public GetTurnamentsForUserResponse GetTurnamentsForUser() => GetTurnamentsForUserBLL.Execute(GetAccountId());

        [Authorize]
        [HttpPost]
        public ElementResponse DeclareTournament(ElementRequest request) => DeclareTournamentBLL.Execute(request, GetAccountId(), GetAccountName(), ConfigurationManager.AppSettings["OlimpEmail"]);

        [Authorize]
        [HttpPost]
        public StatisticsCommandResponse GetStatisticsCommand() => GetStatisticsCommandBLL.Execute(GetAccountId());
    }
}

