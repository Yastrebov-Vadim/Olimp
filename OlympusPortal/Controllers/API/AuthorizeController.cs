using Olimp.DAL.Models;
using Olimp.DAL.Models.Response;
using Olimp.DAL.Operations;
using System;
using System.Web.Http;
using System.Web.Security;

namespace OlympusPortal.Controllers.API
{
    public class AuthorizeController : ApiController
    {
        [HttpPost]
        public string Authorization(AuthorizationRequest request)
        {
            var account = LoginDAL.Execute(request);
            FormsAuthentication.SetAuthCookie(account.Item1, true);

            return account.Item2;
        }


        [HttpPost]
        public GetAccountResponse GetAccount()
        {
            if (User.Identity.IsAuthenticated)
                return new GetAccountResponse
                {
                    IsAuth = true,
                    Login = GetAccountDAL.Execute(Guid.Parse(User.Identity.Name))
                };

            else
                return new GetAccountResponse
                {
                    IsAuth = false,
                    Login = null
                };
        }

        [HttpPost]
        public void Exit() => FormsAuthentication.SignOut();

        [HttpPost]
        public void Registration(RegistrationRequest request) => FormsAuthentication.SetAuthCookie(RegistrationDAL.Execute(request), false);

        [HttpPost]
        public void ConfirmTheCode(RegistrationRequest request) => CheckKodeDAL.Execute(request);

        [HttpPost]
        public void ReplacePassvord(RegistrationRequest request) => ReplacePassvordDAL.Execute(request);
    }
}