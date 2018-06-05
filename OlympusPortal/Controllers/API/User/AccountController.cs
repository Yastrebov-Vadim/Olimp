using Olimp.BLL.Models;
using Olimp.BLL.Models.Response;
using Olimp.BLL.Operations;
using System;
using System.Web.Http;

namespace OlympusPortal.Controllers.API
{
    [Authorize]
    public class AccountController : ApiBaseController
    {
        [HttpPost]
        public GetAccountInfoResponse GetAccountInfo() => GetAccountInfoBLL.Execute(Guid.Parse(GetAccountId()));
        
        [HttpPost]
        public ElementResponse AddPlayer(PlayerRequest request) => AddPlayerBLL.Execute(Guid.Parse(GetAccountId()), request);
        
        [HttpPost]
        public void DellPlayer(ElementRequest request) => DellPlayerBLL.Execute(Guid.Parse(request.Txt));
        
        [HttpPost]
        public void EditAccountInfo(EditAccountRequest request) => EditAccountInfoBLL.Execute(Guid.Parse(GetAccountId()), request);
    }
}