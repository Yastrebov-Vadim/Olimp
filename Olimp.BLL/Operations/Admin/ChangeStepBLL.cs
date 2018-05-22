using Olimp.BLL.Assest;
using Olimp.BLL.Models;
using Olimp.DAL.Assest;
using System;

namespace Olimp.BLL.Operations
{
    public class ChangeStepBLL
    {
        public static void Execute(ChangeStepRequest request)
        {
            DbHelper.ChangeStep(request.Id, request.Step);
           
            if(request.Step == 4)
            {
                var command = DbHelper.GetPositionCommand(Guid.Parse(request.Id));

                command.ForEach(x=> {
                    SendEmailBLL.SendEmail("Окончание турнира", $"Турнир \"{DbHelper.GetTurnamentName(Guid.Parse(request.Id))}\" завершен.", DbHelper.GetAccountEmail(x.id_command));
                });
            }
        }
    }
}