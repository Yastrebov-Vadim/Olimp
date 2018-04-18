using Olimp.DAL.Assest;
using System;

namespace Olimp.BLL.Operations
{
    public class DellPlayerBLL
    {
        public static void Execute(Guid id)
        {
            DbHelper.DellPlayer(id);
        }
    }
}
