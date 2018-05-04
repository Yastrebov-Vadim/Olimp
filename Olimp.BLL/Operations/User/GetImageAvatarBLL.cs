using Olimp.DAL.Assest;
using System;

namespace Olimp.BLL.Operations
{
    public class AddImageAvatarBLL
    {
        public static void Execute(Guid id, string urlBd, string urlDir)
        {
            DbHelper.AddImageAvatar(id, urlBd, urlDir);
        }
    }
}
