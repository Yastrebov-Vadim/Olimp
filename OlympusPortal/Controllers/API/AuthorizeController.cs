using OlympusPortal.Assest;
using OlympusPortal.Models;
using OlympusPortal.Models.Response;
using System;
using System.Web.Http;
using System.Web.Security;

namespace OlympusPortal.Controllers.API
{
    public class AuthorizeController : ApiController
    {
        DbHelper DbHelper = new DbHelper();

        [HttpPost]
        public string Authorization(AuthorizationRequest request)
        {
            return DbHelper.Login(request);
        }

        [HttpPost]
        public GetAccountResponse GetAccount()
        {
            if (User.Identity.IsAuthenticated)
                return new GetAccountResponse(DbHelper.GetAccount(Guid.Parse(User.Identity.Name)), true);

            else
                return new GetAccountResponse(null, false);
        }

        [HttpPost]
        public void Exit()
        {
            FormsAuthentication.SignOut();
        }

        [HttpPost]
        public void Registration(RegistrationRequest request)
        {
            if (DbHelper.CheckKode(request.Email, request.Code))
                throw new ApplicationException("Неверный код подтверждения. Попробуйте выслать новый код.");

            DbHelper.Registration(request);
        }

        [HttpPost]
        public void ConfirmTheCode(RegistrationRequest request)
        {
            if (DbHelper.CheckKode(request.Email, request.Code))
                throw new ApplicationException("Неверный код подтверждения. Попробуйте выслать новый код.");           
        }

        [HttpPost]
        public void ReplacePassvord(RegistrationRequest request)
        {
            DbHelper.ReplacePassvord(request);
        }
        
    }
}