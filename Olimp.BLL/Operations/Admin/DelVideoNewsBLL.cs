using Olimp.DAL.Assest;

namespace Olimp.BLL.Operations
{
    public class DelVideoNewsBLL
    {
        public static void Execute(string newsId)
        {
            DbHelper.DellVideoForNews(newsId);
        }
    }
}
