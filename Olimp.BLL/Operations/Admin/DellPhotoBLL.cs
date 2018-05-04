using Olimp.BLL.Models;
using Olimp.BLL.Models.Response;
using Olimp.DAL.Assest;
using System;

namespace Olimp.BLL.Operations
{
    public class DellPhotoBLL
    {
        public static void Execute(string id)
        {
            DbHelper.DellPhoto(id);
        }
    }
}
