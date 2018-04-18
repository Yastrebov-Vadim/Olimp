using Olimp.BLL.Assest;
using Olimp.DAL.Models;
using Olimp.DAL.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Olimp.DAL.Operations
{
    public class SingCodeToEmailDAL
    {
        public static void Execute(SingCodeToEmailRequest request)
        {
            var singCodeToEmailRequest = new BLL.Models.SingCodeToEmailRequest
            {
                Email = request.Email,
                Login = request.Login
            };

            if (request.Login != null)
                DbHelper.CheckLodinInEmail(singCodeToEmailRequest);

            Random rnd = new Random();
            var code = rnd.Next(1000, 10001);

            DbHelper.SaveUserCode(code, request.Email);

            if (request.Login != null)
                EmailHelper.SendEmail("Изменение пароля", $"Код подтверждения для изменения пароля от Вашей учетной записи: {code}", request.Email);

            else
                EmailHelper.SendEmail("Регистрация", $"Код подтверждения регистрации: {code}", request.Email);
        }
    }
}
