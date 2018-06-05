using Olimp.BLL.Models;
using Olimp.DAL.Assest;
using System;

namespace Olimp.BLL.Operations
{
    public class RegistrationBLL
    {
        public static Tuple<string, string> Execute(RegistrationRequest request)
        {
            if (DbHelper.CheckKode(request.Email, request.Code))
                throw new ApplicationException("Неверный код подтверждения. Попробуйте выслать новый код.");

            var registrationRequest = new DAL.Models.RegistrationRequest
            {
                Code = request.Code,
                CommandName = request.CommandName,
                Email = request.Email,
                Login = request.Login,
                Mobile = request.Mobile,
                Password = request.Password
            };

            var account = DbHelper.Registration(registrationRequest);

            return Tuple.Create(account.id_account.ToString(), account.command_name);
        }
    }
}
