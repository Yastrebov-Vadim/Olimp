using Microsoft.Owin.Security;
using Olimp.BLL.Models;
using Olimp.BLL.Models.Response;
using Olimp.BLL.Operations;
using System.Web;
using System.Web.Http;

namespace OlympusPortal.Controllers.API
{
    public class AuthorizeController : ApiBaseController
    {
        private IAuthenticationManager AuthenticationManager
        {
            get { return HttpContext.Current.GetOwinContext().Authentication; }
        }

        [HttpPost]
        public string SignInUser(AuthorizationRequest request)
        {
            var account = SignInUserBLL.Execute(request);

            SignIn(account.Item1, account.Item2, Role.User);

            return account.Item2;
        }

        [HttpPost]
        public GetAccountResponse GetAccount()
        {
            if (User.Identity.IsAuthenticated)
                return new GetAccountResponse
                {
                    IsAuth = true,
                    Login = GetAccountName()
                };

            else
                return new GetAccountResponse
                {
                    IsAuth = false,
                    Login = null
                };
        }

        [HttpPost]
        public void SignOutUser() => SignOut();

        [HttpPost]
        public void Registration(RegistrationRequest request)
        {
            var account = RegistrationBLL.Execute(request);
            SignIn(account.Item1, account.Item2, Role.User);
        }

        [HttpPost]
        public void ConfirmTheCode(RegistrationRequest request) => CheckKodeBLL.Execute(request);

        [HttpPost]
        public void ReplacePassvord(RegistrationRequest request) => ReplacePassvordBLL.Execute(request);
    }
}