using Olimp.BLL.Models.Response;
using Olimp.BLL.Operations;
using System;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace OlympusPortal.Controllers.API
{
    [Authorize(Roles = "Admin")]
    public class FileAdminController : ApiBaseController
    {
        [HttpPost]
        public async Task<PhotoResponse> AddImgNewsTypeText()
        {
            if (!Request.Content.IsMimeMultipartContent())
                throw new ApplicationException("Ошибка загрузки изображения");

            var provider = new MultipartMemoryStreamProvider();

            string root = HttpContext.Current.Server.MapPath("~/Files/Photo/News/");

            await Request.Content.ReadAsMultipartAsync(provider);

            var file = provider.Contents[0];

            byte[] fileArray = await file.ReadAsByteArrayAsync();

            var newsId = file.Headers.ContentDisposition.FileName.Trim('\"');

            Random rnd = new Random();
            var code = rnd.Next(1000, 10001);

            var filename = newsId + code + ".jpg";
            var urlDir = root + filename;
            var urlBd = $"url(./Files/Photo/News/{filename})";

            DelImgNewsTypeTextBLL.Execute(newsId);

            using (FileStream fs = new FileStream(urlDir, FileMode.Create))
            {
                await fs.WriteAsync(fileArray, 0, fileArray.Length);
            }

            return AddImgForNewsBLL.Execute(newsId, urlDir, urlBd);
        }

        [HttpPost]
        public async Task<PhotoResponse> AddImgNewsTypePhoto()
        {
            if (!Request.Content.IsMimeMultipartContent())
                throw new ApplicationException("Ошибка загрузки изображения");

            var provider = new MultipartMemoryStreamProvider();

            string root = HttpContext.Current.Server.MapPath("~/Files/Photo/News/");

            await Request.Content.ReadAsMultipartAsync(provider);
            
            var file = provider.Contents[0];

            byte[] fileArray = await file.ReadAsByteArrayAsync();

            var newsId = file.Headers.ContentDisposition.FileName.Trim('\"');

            Random rnd = new Random();
            var code = rnd.Next(1000, 10001);

            var filename = newsId + code + ".jpg";
            var urlDir = root + filename;
            var urlBd = $"url(./Files/Photo/News/{filename})";

            using (FileStream fs = new FileStream(urlDir, FileMode.Create))
            {
                await fs.WriteAsync(fileArray, 0, fileArray.Length);
            }
            
            return AddImgForNewsBLL.Execute(newsId, urlDir, urlBd);
        }

        [HttpPost]
        public void DellPhoto(ElementResponse response) => DellPhotoBLL.Execute(response.Txt);

        [HttpPost]
        public async Task<ElementResponse> AddVideoForNews()
        {
            if (!Request.Content.IsMimeMultipartContent())
                throw new ApplicationException("Ошибка загрузки видео");

            var provider = new MultipartMemoryStreamProvider();

            string root = HttpContext.Current.Server.MapPath("~/Files/Video/News/");

            await Request.Content.ReadAsMultipartAsync(provider);

            var file = provider.Contents[0];

            byte[] fileArray = await file.ReadAsByteArrayAsync();

            var newsId = file.Headers.ContentDisposition.FileName.Trim('\"');

            Random rnd = new Random();
            var code = rnd.Next(1000, 10001);

            var filename = newsId + code + ".mp4";
            var urlDir = root + filename;
            var urlBd = $"./Files/Video/News/{filename}";

            DelVideoNewsBLL.Execute(newsId);

            using (FileStream fs = new FileStream(urlDir, FileMode.Create))
            {
                await fs.WriteAsync(fileArray, 0, fileArray.Length);
            }

            return AddVideoForNewsBLL.Execute(newsId, urlDir, urlBd);
        }
    }
}