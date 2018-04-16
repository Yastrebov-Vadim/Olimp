using OlympusPortal.Assest;
using OlympusPortal.Models;
using OlympusPortal.Models.Response;
using System;
using System.Web.Http;

namespace OlympusPortal.Controllers.API
{
    public class AccountController : ApiController
    {
        DbHelper DbHelper = new DbHelper();

        [Authorize]
        [HttpPost]
        public GetAccountInfoResponse GetAccount()
        {
            return DbHelper.GetAccountInfo(Guid.Parse(User.Identity.Name));
        }

        [Authorize]
        [HttpPost]
        public ElementResponse AddPlayer(PlayerRequest request)
        {
           return DbHelper.AddPlayer(Guid.Parse(User.Identity.Name), request);
        }

        [Authorize]
        [HttpPost]
        public void DellPlayer(ElementRequest request)
        {
            DbHelper.DellPlayer(Guid.Parse(request.Txt));
        }

        [Authorize]
        [HttpPost]
        public void EditAccountInfo(EditAccountRequest request)
        {
            DbHelper.EditAccountInfo(Guid.Parse(User.Identity.Name),request);
        }
    }
}