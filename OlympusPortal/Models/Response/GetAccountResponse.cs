using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OlympusPortal.Models.Response
{
    public class GetAccountResponse
    {
        public string Login  { get; set; }
        public bool IsAuth { get; set; }

        public GetAccountResponse(string login, bool isAuth)
        {
            Login = login;
            IsAuth = isAuth;
        }
    }
}

