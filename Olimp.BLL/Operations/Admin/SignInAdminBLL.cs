using Olimp.BLL.Models;
using Olimp.DAL.Assest;
using System;

namespace Olimp.BLL.Operations
{
    public class SignInAdminBLL
    {
        public static Tuple<string, string> Execute(AuthorizationRequest request)
        {
            var authorizationRequest = new DAL.Models.AuthorizationRequest {
                Login = request.Login,
                Password = request.Password
            };

            var admin = DbHelper.SignInAdmin(authorizationRequest);

            if (admin == null)
                throw new ApplicationException("Неверный логин или пароль");

            return Tuple.Create(admin.id_admin.ToString(), admin.name);
        }
    }
}
