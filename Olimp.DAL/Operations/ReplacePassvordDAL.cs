using Olimp.BLL.Assest;
using Olimp.DAL.Models;
using Olimp.DAL.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Olimp.DAL.Operations
{
    public class ReplacePassvordDAL
    {
        public static void Execute(RegistrationRequest request)
        {
            var registrationRequest = new BLL.Models.RegistrationRequest {
                Code= request.Code,
                CommandName= request.CommandName,
                Email= request.Email,
                Login= request.Login,
                Mobile= request.Mobile,
                Password= request.Password,
            };

            DbHelper.ReplacePassvord(registrationRequest);
        }
    }
}
