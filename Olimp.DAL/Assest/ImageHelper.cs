using System;
using System.IO;

namespace Olimp.DAL.Assest
{
    public class ImageHelper
    {
        public static void CheckImageAvatar(Guid id, string urlDir, string urlBd)
        {
            var account = DbHelper.GetAccountInfo(id);

            if (account.foto == null)
                return;

            var fotoName = account.foto.Substring(24, account.foto.Length - 25);

            if (File.Exists(urlDir + fotoName))
            {
                File.Delete(urlDir + fotoName);
            }
        }
    }
}