using Olimp.BLL.Models;
using Olimp.DAL.Assest;
using System;
using System.Collections.Generic;

namespace Olimp.BLL.Operations
{
    public class GetPositionPlayOffBLL
    {
        public static Tuple<List<TurnamentPlayOff>, List<List<PositionCommand>>> Execute(Guid turnamentId, bool isAdmin)
        {
            var circle = DbHelper.GetCircleForTurnament(turnamentId);
            circle.Sort((a, b) => a.numbr_circle <= b.numbr_circle ? -1 : 1);

            var turnamentPlayOff = new List<TurnamentPlayOff>();
            var positionPlayOff = new List<List<PositionCommand>>();

            if (circle != null)
            {
                circle.ForEach(x =>
                {
                    turnamentPlayOff.Add(new TurnamentPlayOff
                    {
                        PlayOffId = x.id.ToString(),
                        NumberCircle = x.numbr_circle,
                        StateCode = x.state_code,
                        GroupTourNumber = GetGroupTourNumberBLL.Execute(x.id, isAdmin)
                    });

                    var position = DbHelper.GetPositionCommand(x.id);

                    var pos = new List<PositionCommand>();

                    position.ForEach(p =>
                    {
                        pos.Add(new PositionCommand
                        {
                            CommandId = p.id_command.ToString(),
                            CommandName = p.command_name,
                            Points = p.points,
                            Position = p.position,
                            Place = p.place
                        });
                    });

                    positionPlayOff.Add(pos);
                });
            }

            return new Tuple<List<TurnamentPlayOff>, List<List<PositionCommand>>>(turnamentPlayOff, positionPlayOff);
        }
    }
}
