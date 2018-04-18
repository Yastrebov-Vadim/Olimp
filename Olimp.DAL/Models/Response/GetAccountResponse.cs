using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Olimp.DAL.Models.Response
{
    public class GetAccountResponse
    {
        public string Login  { get; set; }
        public bool IsAuth { get; set; }
    }
}

