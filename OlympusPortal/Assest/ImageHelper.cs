using System;
using System.IO;

namespace OlympusPortal.Assest
{
    public class ImageHelper
    {
        DbHelper DbHelper = new DbHelper();
        public void CheckImageAvatar(Guid id, string urlDir, string urlBd)
        {
            var account = DbHelper.GetAccountInfo(id);

            if (account.Foto == null)
                return;

            var fotoName = account.Foto.Substring(24, account.Foto.Length - 25);

            if (File.Exists(urlDir + fotoName))
            {
                File.Delete(urlDir + fotoName);
            }
        }
    }
}