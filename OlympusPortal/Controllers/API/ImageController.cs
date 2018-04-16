using OlympusPortal.Assest;
using OlympusPortal.Models;
using OlympusPortal.Models.Response;
using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace OlympusPortal.Controllers.API
{
    public class ImageController : ApiController
    {
        DbHelper DbHelper = new DbHelper();
        ImageHelper ImageHelper = new ImageHelper();

        [Authorize]
        [HttpPost]
        public async Task<ElementResponse> GetImageAvatar()
        {
            if (!Request.Content.IsMimeMultipartContent())
                throw new ApplicationException("Ошибка загрузки изображения");

            var idAccount = Guid.Parse(User.Identity.Name);

            var provider = new MultipartMemoryStreamProvider();

            string root = HttpContext.Current.Server.MapPath("~/Files/Foto/Avatar/");

            Random rnd = new Random();
            var code = rnd.Next(1000, 10001);

            var filename = User.Identity.Name + code.ToString() + ".jpg";
            var urlDir = root + filename;
            var urlBd = $"url(./Files/Foto/Avatar/{filename})";

            await Request.Content.ReadAsMultipartAsync(provider);

            var file = provider.Contents[0];

            byte[] fileArray = await file.ReadAsByteArrayAsync();

            ImageHelper.CheckImageAvatar(idAccount, root, urlBd);

            using (System.IO.FileStream fs = new System.IO.FileStream(urlDir, System.IO.FileMode.Create))
            {
                await fs.WriteAsync(fileArray, 0, fileArray.Length);
            }

            DbHelper.GetImageAvatar(idAccount, urlBd);

            return new ElementResponse(urlBd);
        }
    }
}
