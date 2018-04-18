using Olimp.DAL.Assest;
using System;

namespace Olimp.BLL.Operations
{
    public class GetImageAvatarBLL
    {
        public static void Execute(Guid id, string urlBd)
        {
            DbHelper.GetImageAvatar(id, urlBd);
        }
    }
}
