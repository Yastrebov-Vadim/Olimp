using Olimp.DAL.Models;
using Olimp.DAL.Models.Response;
using Olimp.DAL.Operations;
using System;
using System.Web.Http;

namespace OlympusPortal.Controllers.API
{
    public class AccountController : ApiController
    {
        [Authorize]
        [HttpPost]
        public GetAccountInfoResponse GetAccountInfo() => GetAccountInfoDAL.Execute(Guid.Parse(User.Identity.Name));

        [Authorize]
        [HttpPost]
        public ElementResponse AddPlayer(PlayerRequest request) => AddPlayerDAL.Execute(Guid.Parse(User.Identity.Name), request);

        [Authorize]
        [HttpPost]
        public void DellPlayer(ElementRequest request) => DellPlayerDAL.Execute(Guid.Parse(request.Txt));

        [Authorize]
        [HttpPost]
        public void EditAccountInfo(EditAccountRequest request) => EditAccountInfoDAL.Execute(Guid.Parse(User.Identity.Name), request);
    }
}