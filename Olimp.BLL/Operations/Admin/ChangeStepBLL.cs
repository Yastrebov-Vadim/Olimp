using Olimp.BLL.Models;
using Olimp.DAL.Assest;

namespace Olimp.BLL.Operations
{
    public class ChangeStepBLL
    {
        public static void Execute(ChangeStepRequest request)
        {
            DbHelper.ChangeStep(request.Id, request.Step);
        }
    }
}