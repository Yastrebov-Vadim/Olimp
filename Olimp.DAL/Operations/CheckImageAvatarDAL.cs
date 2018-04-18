using Olimp.BLL.Assest;
using Olimp.DAL.Models;
using System;

namespace Olimp.DAL.Operations
{
    public class CheckImageAvatarDAL
    {
        public static void Execute(Guid id, string urlDir, string urlBd)
        {
            ImageHelper.CheckImageAvatar(id, urlDir, urlBd);
        }
    }
}
