using Olimp.BLL.Assest;
using Olimp.DAL.Models;
using Olimp.DAL.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Olimp.DAL.Operations
{
    public class LoginDAL
    {
        public static Tuple<string, string> Execute(AuthorizationRequest request)
        {
            var authorizationRequest = new BLL.Models.AuthorizationRequest {
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
