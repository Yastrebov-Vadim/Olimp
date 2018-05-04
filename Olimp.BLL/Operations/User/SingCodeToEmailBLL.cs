using Olimp.BLL.Assest;
using Olimp.BLL.Models;
using Olimp.DAL.Assest;
using System;

namespace Olimp.BLL.Operations
{
    public class SingCodeToEmailBLL
    {
        public static void Execute(SingCodeToEmailRequest request)
        {
            var singCodeToEmailRequest = new DAL.Models.SingCodeToEmailRequest
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
                SendEmailBLL.SendEmail("Изменение пароля", $"Код подтверждения для изменения пароля от Вашей учетной записи: {code}", request.Email);

            else
                SendEmailBLL.SendEmail("Регистрация", $"Код подтверждения регистрации: {code}", request.Email);
        }
    }
}
