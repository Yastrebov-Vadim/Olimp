using Olimp.BLL.Models;
using Olimp.DAL.Assest;
using System;

namespace Olimp.BLL.Operations
{
    public class SignInUserBLL
    {
        public static Tuple<string, string> Execute(AuthorizationRequest request)
        {
            var authorizationRequest = new DAL.Models.AuthorizationRequest {
                Login = request.Login,
                Password = request.Password
            };

            var account = DbHelper.SignInUser(authorizationRequest);

            if (account == null)
                throw new ApplicationException("Неверный логин или пароль");

            return Tuple.Create(account.id.ToString(), account.command_name);
        }
    }
}
