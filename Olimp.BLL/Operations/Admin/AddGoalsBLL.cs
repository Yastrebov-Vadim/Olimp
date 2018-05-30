using Olimp.BLL.Models;
using Olimp.DAL.Assest;
using System;

namespace Olimp.BLL.Operations
{
    public class AddGoalsBLL
    {
        public static void Execute(AddGoalsRequest request)
        {
            DbHelper.AddGoals(Guid.Parse(request.Goal.TurnamentId), Guid.Parse(request.Goal.CommandId), Guid.Parse(request.Goal.PlayerId), Guid.Parse(request.Goal.GameId), request.Goal.Time);
        }
    }
}
