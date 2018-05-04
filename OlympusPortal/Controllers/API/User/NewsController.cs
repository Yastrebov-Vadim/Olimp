using Olimp.BLL.Models;
using Olimp.BLL.Models.Response;
using Olimp.BLL.Operations;
using System.Web.Http;

namespace OlympusPortal.Controllers.API
{
    public class NewsController : ApiBaseController
    {
        [HttpPost]
        public GetAllNewsResponse GetNewsActiveTop(TopRequest request) => GetNewsActiveBLL.Execute(request);

        [HttpPost]
        public GetAllNewsResponse GetNewsActive(TopRequest request) => GetNewsActiveBLL.Execute(request);
    }
}