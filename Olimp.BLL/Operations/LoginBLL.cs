using Olimp.BLL.Models;
using Olimp.DAL.Assest;
using System;

namespace Olimp.BLL.Operations
{
    public class LoginBLL
    {
        public static Tuple<string, string> Execute(AuthorizationRequest request)
        {
            var authorizationRequest = new DAL.Models.AuthorizationRequest {
                Login = request.Login,
                Password = request.Password
            };

            var command = DbHelper.Login(authorizationRequest);

            if (command == null)
                throw new ApplicationException("Неверный логин или пароль");

            return Tuple.Create(command.id.ToString(), command.command_name);
        }
    }
}
