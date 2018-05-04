using Olimp.BLL.Models.Response;
using Olimp.BLL.Operations;
using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace OlympusPortal.Controllers.API
{
    public class ImageController : ApiBaseController
    {
        [Authorize]
        [HttpPost]
        public async Task<ElementResponse> AddImageAvatar()
        {
            if (!Request.Content.IsMimeMultipartContent())
                throw new ApplicationException("Ошибка загрузки изображения");

            var idAccount = Guid.Parse(GetAccountId());

            var provider = new MultipartMemoryStreamProvider();

            string root = HttpContext.Current.Server.MapPath("~/Files/Photo/Avatar/");

            Random rnd = new Random();
            var code = rnd.Next(1000, 10001);

            var filename = GetAccountId() + code.ToString() + ".jpg";
            var urlDir = root + filename;
            var urlBd = $"url(./Files/Photo/Avatar/{filename})";

            await Request.Content.ReadAsMultipartAsync(provider);

            var file = provider.Contents[0];

            byte[] fileArray = await file.ReadAsByteArrayAsync();

            DellImageAvatarBLL.Execute(idAccount);

            using (System.IO.FileStream fs = new System.IO.FileStream(urlDir, System.IO.FileMode.Create))
            {
                await fs.WriteAsync(fileArray, 0, fileArray.Length);
            }

            AddImageAvatarBLL.Execute(idAccount, urlBd, urlDir);

            return new ElementResponse { Txt = urlBd };
        }
    }
}
