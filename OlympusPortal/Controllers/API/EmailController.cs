using Olimp.BLL.Models;
using Olimp.BLL.Operations;
using System.Web.Http;

namespace OlympusPortal.Controllers.API
{
    public class EmailController : ApiBaseController
    {
        [HttpPost]
        public void SingCodeToEmail(SingCodeToEmailRequest request) => SingCodeToEmailBLL.Execute(request);
    }
}
