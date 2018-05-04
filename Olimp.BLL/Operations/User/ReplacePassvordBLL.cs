using Olimp.BLL.Models;
using Olimp.DAL.Assest;

namespace Olimp.BLL.Operations
{
    public class ReplacePassvordBLL
    {
        public static void Execute(RegistrationRequest request)
        {
            var registrationRequest = new DAL.Models.RegistrationRequest {
                Code= request.Code,
                CommandName= request.CommandName,
                Email= request.Email,
                Login= request.Login,
                Mobile= request.Mobile,
                Password= request.Password,
            };

            DbHelper.ReplacePassvord(registrationRequest);
        }
    }
}
