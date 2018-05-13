using Olimp.BLL.Models;
using Olimp.BLL.Models.Response;
using Olimp.BLL.Operations;
using System.Web.Http;

namespace OlympusPortal.Controllers.API
{
    public class PublicController : ApiBaseController
    {
        [HttpPost]
        public GetCommandsResponse GetCommand() => GetCommandBLL.Execute();

        [HttpPost]
        public GetCommandFilterResponse GetCommandFilter() => GetCommandFilterBLL.Execute();

        [HttpPost]
        public GetPhototResponse GetPhoto(GetPhotoRequest request) => GetPhotoBLL.Execute(request);
    }
}