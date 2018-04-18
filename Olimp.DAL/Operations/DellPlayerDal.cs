using Olimp.BLL.Assest;
using Olimp.DAL.Models;
using Olimp.DAL.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Olimp.DAL.Operations
{
    public class DellPlayerDAL
    {
        public static void Execute(Guid id)
        {
            DbHelper.DellPlayer(id);
        }
    }
}
