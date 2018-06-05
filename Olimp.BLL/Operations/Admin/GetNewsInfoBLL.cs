using Olimp.BLL.Models;
using Olimp.BLL.Models.Response;
using Olimp.DAL.Assest;
using System;
using System.Collections.Generic;

namespace Olimp.BLL.Operations
{
    public class GetNewsInfoBLL
    {
        public static NewsInfoResponse Execute()
        {
            var news = DbHelper.GetAllNews();

            var response = new NewsInfoResponse { News = new List<NewsInfo>() };

            if (news == null)
                return response;

            news.Sort((a, b) => a.date <= b.date ? 1 : -1);
            
            foreach (var element in news)
            {
                response.News.Add(new NewsInfo
                {
                    Id = element.id_news.ToString(),
                    Date = element.date.ToShortDateString(),
                    Title = element.title,
                    Type = element.type,
                    Top = element.top,
                    Active = element.active
                });

            }

            return response;
        }
    }
}
