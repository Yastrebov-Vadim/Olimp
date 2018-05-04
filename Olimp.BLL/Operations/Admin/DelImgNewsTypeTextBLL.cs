using Olimp.DAL.Assest;

namespace Olimp.BLL.Operations
{
    public class DelImgNewsTypeTextBLL
    {
        public static void Execute(string newsId)
        {
            DbHelper.DellPhotoForNews(newsId);
        }
    }
}
