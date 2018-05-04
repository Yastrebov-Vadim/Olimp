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
            var elementRequest = new DAL.Models.ElementRequest
            {
                Txt = request.Txt
            };

            return new ElementResponse { Txt = DbHelper.AddNews(elementRequest) };
        }
    }
}
