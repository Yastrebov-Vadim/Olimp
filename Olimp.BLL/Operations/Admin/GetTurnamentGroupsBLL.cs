using Olimp.BLL.Models;
using Olimp.DAL.Assest;
using System;
using System.Collections.Generic;

namespace Olimp.BLL.Operations
{
    public class GetTurnamentGroupsBLL
    {
        public static List<TurnamentGroups> Execute(Guid turnamentId, bool isAdmin)
        {
            var response = new List<TurnamentGroups>();

            var turnamentGroup = DbHelper.GetTurnamentGroups(turnamentId);

            turnamentGroup.ForEach(x => {
                var positionCommands =  GetPositionCommandBLL.Execute(x.id_group_for_turnament);
                var groupTourNumber =  GetGroupTourNumberBLL.Execute(x.id_group_for_turnament, isAdmin);

                response.Add(new TurnamentGroups {
                    GroupId = x.id_group_for_turnament.ToString(),
                    PositionCommand = positionCommands,
                    GroupTourNumber = groupTourNumber
                });
            });

            return response;
        }
    }
}
