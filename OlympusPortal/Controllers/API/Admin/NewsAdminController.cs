using Olimp.BLL.Models;
using Olimp.BLL.Models.Response;
using Olimp.BLL.Operations;
using System.Web.Http;

namespace OlympusPortal.Controllers.API
{
    [Authorize(Roles = "Admin")]
    public class NewsAdminController : ApiBaseController
    {
        [HttpPost]
        public NewsInfoResponse GetNewsInfo() => GetNewsInfoBLL.Execute();

        [HttpPost]
        public GetNewsResponse GetNews(ElementRequest request) => GetNewsBLL.Execute(request);

        [HttpPost]
        public ElementResponse AddNews(ElementRequest request) => AddNewsBLL.Execute(request);

        [HttpPost]
        public void DellNews(ElementRequest request) => DellNewsBLL.Execute(request);

        [HttpPost]
        public void SaveNews(SaveNewsRequest request) => SaveNewsBLL.Execute(request);

        [HttpPost]
        public ElementResponse ActiveNews(ElementRequest request) => ActiveNewsBLL.Execute(request);
    }
}
