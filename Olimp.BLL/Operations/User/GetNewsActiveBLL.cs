using Olimp.BLL.Models;
using Olimp.BLL.Models.Response;
using Olimp.DAL.Assest;
using System.Collections.Generic;
using System.Linq;

namespace Olimp.BLL.Operations
{
    public class GetNewsActiveBLL
    {
        public static GetAllNewsResponse Execute(TopRequest request)
        {
            var news = DbHelper.GetNewsActive(request.Top);

            news.Sort((a, b) => a.date <= b.date ? 1 : -1);

            var response = new GetAllNewsResponse { News = new List<FullNews>() };

            if (news == null)
                return response;

            foreach (var element in news)
            {
                var urlVideo = DbHelper.GetVideoForNews(element.id);
                var img_for_news = DbHelper.GetPhotoForNews(element.id);

                var photo = new List<Photo>();

                if (!img_for_news.Any() && element.type == 1)
                {
                    photo.Add(new Photo
                    {
                        Url = "url(./content/img/news.png)"
                    });
                }

                foreach (var item in img_for_news)
                {
                    photo.Add(new Photo
                    {
                        Id = item.id.ToString(),
                        Url = item.url_bd
                    });
                }

                response.News.Add(new FullNews
                {
                    Id = element.id.ToString(),
                    Title = element.title,
                    Text = element.text,
                    Date = element.date.ToShortDateString(),
                    Type = element.type,
                    UrlVideo = urlVideo,
                    Photo = photo
                });
            }

            return response;
        }
    }
}
