using Olimp.BLL.Models;
using Olimp.BLL.Models.Response;
using Olimp.DAL.Assest;
using System;

namespace Olimp.BLL.Operations
{
    public class ActiveNewsBLL
    {
        public static ElementResponse Execute(ElementRequest request)
        {
            return new ElementResponse { Txt = DbHelper.ActiveNews(request.Txt) ? "активна" : "не активна" };
        }
    }
}
