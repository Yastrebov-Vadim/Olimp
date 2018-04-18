using Olimp.DAL.Models;
using Olimp.DAL.Operations;
using System.Web.Http;

namespace OlympusPortal.Controllers.API
{
    public class EmailController : ApiController
    {
        [HttpPost]
        public void SingCodeToEmail(SingCodeToEmailRequest request) => SingCodeToEmailDAL.Execute(request);
    }
}
