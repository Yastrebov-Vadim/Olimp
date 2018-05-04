using Olimp.BLL.Models;
using Olimp.BLL.Models.Response;
using Olimp.DAL.Assest;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Olimp.BLL.Operations
{
    public class GetNewsBLL
    {
        public static GetNewsResponse Execute(ElementRequest request)
        {
            var news = DbHelper.GetNews(Guid.Parse(request.Txt));
            
            var img_for_news = DbHelper.GetPhotoForNews(news.id);

            var photo = new List<Photo>();

            if (!img_for_news.Any() && news.type == 1)
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

            var response = new GetNewsResponse
            {
                News = new FullNews
                {
                    Id = news.id.ToString(),
                    Text = news.text,
                    Title = news.title,
                    Date = news.date.ToShortDateString(),
                    Type = news.type,
                    Top = news.top,
                    Photo = photo,
                    UrlVideo = DbHelper.GetVideoForNews(news.id),
                    CommandOne = news.command_one.ToString(),
                    CommandTwo = news.command_two.ToString()
                }
            };

            return response;
        }
    }
}
