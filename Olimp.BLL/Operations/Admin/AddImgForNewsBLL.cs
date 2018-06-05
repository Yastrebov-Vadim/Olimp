using Olimp.BLL.Models;
using Olimp.BLL.Models.Response;
using Olimp.DAL.Assest;

namespace Olimp.BLL.Operations
{
    public class AddImgForNewsBLL
    {
        public static PhotoResponse Execute(string newsId, string urlDir, string urlBd)
        {
            var photo = DbHelper.AddImgForNews(newsId, urlDir, urlBd);

            return new PhotoResponse
            {
                Photo =
                new Photo
                {
                    Id = photo.id_img_for_news.ToString(),
                    Url = photo.url_bd
                }
            };
        }
    }
}
