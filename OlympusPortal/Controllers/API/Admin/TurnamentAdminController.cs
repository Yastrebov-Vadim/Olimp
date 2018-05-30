using Olimp.BLL.Models;
using Olimp.BLL.Models.Response;
using Olimp.BLL.Operations;
using System.Web.Http;

namespace OlympusPortal.Controllers.API
{
    public class TurnamentAdminController : ApiBaseController
    {
        [HttpPost]
        public TurnamentsInfoResponse GetTurnamentInfo() => GetTurnamentInfoBLL.Execute();

        [HttpPost]
        public ElementTypeResponse AddTurnament(ElementRequest request) => AddTurnamentBLL.Execute(request);

        [HttpPost]
        public void DellTurnament(ElementRequest request) => DellTurnamentBLL.Execute(request);

        [HttpPost]
        public GetCircleTurnamentResponse GetTurnamentCircle(ElementRequest request) => GetTurnamentCircleBLL.Execute(request);

        [HttpPost]
        public GetMixedTurnamentResponse GetTurnamentMixed(ElementRequest request) => GetTurnamentMixedBLL.Execute(request);

        [HttpPost]
        public void SaveTurnamentInfo(SaveTurnamentInfoRequest request) => SaveTurnamentInfoBLL.Execute(request);

        [HttpPost]
        public void ChangeStep(ChangeStepRequest request) => ChangeStepBLL.Execute(request);

        [HttpPost]
        public void AcceptDeclare(DeclareRequest request) => AcceptDeclareBLL.Execute(request);

        [HttpPost]
        public void RemoveDeclare(RemoveDeclareRequest request) => RemoveDeclareBLL.Execute(request);

        [HttpPost]
        public void CalculateTable(ElementRequest request) => CalculateTableBLL.Execute(request);

        [HttpPost]
        public void CalculateGroup(CalculateGroupRequest request) => CalculateGroupBLL.Execute(request);

        [HttpPost]
        public void CalculatePlayOff(ElementRequest request) => CalculatePlayOffBLL.Execute(request);

        [HttpPost]
        public void DivideForDay(DivideForDayRequest request) => DivideForDayBLL.Execute(request);

        [HttpPost]
        public GetArenaResponse GetArena() => GetArenaBLL.Execute();

        [HttpPost]
        public void ChangeArena(ChangeGameDayRequest request) => ChangeArenaBLL.Execute(request);

        [HttpPost]
        public void ChangeDate(ChangeGameDayRequest request) => ChangeDateBLL.Execute(request);
        
        [HttpPost]
        public void ChangeStatusTour(TourStepRequest request) => ChangeStatusTourBLL.Execute(request);

        [HttpPost]
        public void CompleteGame(CompleteGameRequest request) => CompleteGameBLL.Execute(request);

        [HttpPost]
        public void CloseTour(TourStepRequest request) => CloseTourBLL.Execute(request);

        [HttpPost]
        public GetPlayerForTurnamentRequest GetPlayerForTurnament(ElementRequest request) => GetPlayerForTurnamentBLL.Execute(request);

        [HttpPost]
        public void AddGoals(AddGoalsRequest request) => AddGoalsBLL.Execute(request);
    }
}
