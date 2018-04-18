using Olimp.BLL.Assest;
using Olimp.DAL.Models;
using Olimp.DAL.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Olimp.DAL.Operations
{
    public class GetImageAvatarDAL
    {
        public static void Execute(Guid id, string urlBd)
        {
            DbHelper.GetImageAvatar(id, urlBd);
        }
    }
}
