using OlympusPortal.Assest;
using OlympusPortal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace OlympusPortal.Controllers.API
{
    public class EmailController : ApiController
    {
        EmailHelper EmailHelper = new EmailHelper();
        DbHelper DbHelper = new DbHelper();

        [HttpPost]
        public void SingCodeToEmail(SingCodeToEmailRequest request)
        {
            if (request.Login != null)
                DbHelper.CheckLodinInEmail(request);

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
