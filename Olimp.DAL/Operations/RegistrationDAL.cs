using Olimp.BLL.Assest;
using Olimp.DAL.Models;
using Olimp.DAL.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Olimp.DAL.Operations
{
    public class RegistrationDAL
    {
        public static string Execute(RegistrationRequest request)
        {
            if (DbHelper.CheckKode(request.Email, request.Code))
                throw new ApplicationException("Неверный код подтверждения. Попробуйте выслать новый код.");

            var registrationRequest = new BLL.Models.RegistrationRequest
            {
                Code = request.Code,
                CommandName = request.CommandName,
                Email = request.Email,
                Login = request.Login,
                Mobile = request.Mobile,
                Password = request.Password
            };

            return DbHelper.Registration(registrationRequest);
        }
    }
}
