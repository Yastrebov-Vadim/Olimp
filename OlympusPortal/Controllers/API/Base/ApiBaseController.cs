using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;
using Olimp.BLL.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Web;
using System.Web.Http;

namespace OlympusPortal.Controllers.API
{
    public class ApiBaseController : ApiController
    {
        private IAuthenticationManager AuthenticationManager
        {
            get { return HttpContext.Current.GetOwinContext().Authentication; }
        }

        protected void SignIn(string id, string name, Role role)
        {
            var claims = new List<Claim>();

            claims.Add(new Claim(ClaimTypes.NameIdentifier, id));
            claims.Add(new Claim(ClaimTypes.Name, name));
            claims.Add(new Claim(ClaimTypes.Role, role.ToString()));

            var identity = new ClaimsIdentity(claims, DefaultAuthenticationTypes.ApplicationCookie);

            AuthenticationManager.SignIn(new AuthenticationProperties()
            {
                IsPersistent = true,
            }, identity);
        }

        protected void SignOut()
        {
            AuthenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie, DefaultAuthenticationTypes.ExternalCookie);
        }

        protected String GetAccountId()
        {
            var identity = (ClaimsPrincipal)Thread.CurrentPrincipal;

            return identity.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value;
        }

        protected String GetAccountName()
        {
            var identity = (ClaimsPrincipal)Thread.CurrentPrincipal;

            return identity.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name).Value;
        }

        public String GetUserRole()
        {
            var identity = (ClaimsPrincipal)Thread.CurrentPrincipal;

            return identity.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role).Value;
        }
    }
}