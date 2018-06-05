using Olimp.BLL.Models;
using Olimp.BLL.Models.Response;
using Olimp.DAL.Assest;

namespace Olimp.BLL.Operations
{
    public class AddArenaBLL
    {
        public static ElementResponse Execute(ElementRequest request)
        {
          return new ElementResponse { Txt = DbHelper.AddArena(request.Txt) };
        }
    }
}
