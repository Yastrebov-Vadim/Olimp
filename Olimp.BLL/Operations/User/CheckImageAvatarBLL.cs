using Olimp.DAL.Assest;
using System;

namespace Olimp.BLL.Operations
{
    public class DellImageAvatarBLL
    {
        public static void Execute(Guid id)
        {
            DbHelper.DellImageAvatar(id);
        }
    }
}
