using Olimp.BLL.Models;
using Olimp.BLL.Models.Response;
using Olimp.BLL.Operations;
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
            var account = LoginBLL.Execute(request);
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
                    Login = GetAccountBLL.Execute(Guid.Parse(User.Identity.Name))
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
        public void Registration(RegistrationRequest request) => FormsAuthentication.SetAuthCookie(RegistrationBLL.Execute(request), false);

        [HttpPost]
        public void ConfirmTheCode(RegistrationRequest request) => CheckKodeBLL.Execute(request);

        [HttpPost]
        public void ReplacePassvord(RegistrationRequest request) => ReplacePassvordBLL.Execute(request);
    }
}