using Olimp.DAL.Assest;
using System;

namespace Olimp.BLL.Operations
{
    public class CheckImageAvatarBLL
    {
        public static void Execute(Guid id, string urlDir, string urlBd)
        {
            ImageHelper.CheckImageAvatar(id, urlDir, urlBd);
        }
    }
}
