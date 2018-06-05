using Olimp.BLL.Models;
using Olimp.DAL.Assest;
using System;

namespace Olimp.BLL.Operations
{
    public class DellArenaBLL
    {
        public static void Execute(ElementRequest request)
        {
          DbHelper.DellArena(Guid.Parse(request.Txt));
        }
    }
}