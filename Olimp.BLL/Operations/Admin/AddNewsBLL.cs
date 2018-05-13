using Olimp.BLL.Models;
using Olimp.BLL.Models.Response;
using Olimp.DAL.Assest;
using System;

namespace Olimp.BLL.Operations
{
    public class AddNewsBLL
    {
        public static ElementResponse Execute(ElementRequest request)
        {
            return new ElementResponse { Txt = DbHelper.AddNews(Convert.ToInt32(request.Txt)) };
        }
    }
}
