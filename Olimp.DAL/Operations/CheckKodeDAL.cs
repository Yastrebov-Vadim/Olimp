using Olimp.BLL.Assest;
using Olimp.DAL.Models;
using Olimp.DAL.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Olimp.DAL.Operations
{
    public class CheckKodeDAL
    {
        public static void Execute(RegistrationRequest request)
        {
            if (DbHelper.CheckKode(request.Email, request.Code))
                throw new ApplicationException("Неверный код подтверждения. Попробуйте выслать новый код.");
        }
    }
}
