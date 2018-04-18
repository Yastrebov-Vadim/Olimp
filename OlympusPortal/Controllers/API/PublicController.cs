using Olimp.DAL.Models.Response;
using Olimp.DAL.Operations;
using System.Web.Http;

namespace OlympusPortal.Controllers.API
{
    public class PublicController : ApiController
    {
        [HttpPost]
        public GetCommandsResponse GetCommand() => GetCommandDAL.Execute();

        [HttpPost]
        public GetCommandFilterResponse GetCommandFilter() => GetCommandFilterDAL.Execute();
    }
}
