using Olimp.BLL.Models;
using Olimp.BLL.Models.Response;
using Olimp.DAL.Assest;

namespace Olimp.BLL.Operations
{
    public class AddVideoForNewsBLL
    {
        public static ElementResponse Execute(string newsId, string urlDir, string urlBd)
        {
            return new ElementResponse { Txt = DbHelper.AddVideoForNews(newsId, urlDir, urlBd) };
        }
    }
}
