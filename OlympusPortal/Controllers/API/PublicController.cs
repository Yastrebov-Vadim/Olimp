using OlympusPortal.Assest;
using OlympusPortal.Models.Response;
using System.Web.Http;

namespace OlympusPortal.Controllers.API
{
    public class PublicController : ApiController
    {
        DbHelper DbHelper = new DbHelper();
        
        [HttpPost]
        public GetCommandsResponse GetCommand()
        {
            return DbHelper.GetCommand();
        }

        [HttpPost]
        public GetCommandFilterResponse GetCommandFilter()
        {
            return DbHelper.GetCommandFilter();
        }
    }
}
