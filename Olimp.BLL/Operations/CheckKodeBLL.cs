using Olimp.BLL.Models;
using Olimp.DAL.Assest;
using System;

namespace Olimp.BLL.Operations
{
    public class CheckKodeBLL
    {
        public static void Execute(RegistrationRequest request)
        {
            if (DbHelper.CheckKode(request.Email, request.Code))
                throw new ApplicationException("Неверный код подтверждения. Попробуйте выслать новый код.");
        }
    }
}
