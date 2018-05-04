using System;
using System.IO;

namespace Olimp.DAL.Assest
{
    public class FileHelper
    {
        public static void DellFile(string urlDir)
        {
            if (File.Exists(urlDir))
            {
                File.Delete(urlDir);
            }
        }
    }
}