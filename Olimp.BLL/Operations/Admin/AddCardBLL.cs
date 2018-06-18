using Olimp.BLL.Models;
using Olimp.DAL.Assest;
using System;

namespace Olimp.BLL.Operations
{
    public class AddCardBLL
    {
        public static void Execute(AddCardRequest request)
        {
            DbHelper.CommandSkip(Guid.Parse(request.Card.TurnamentId), Guid.Parse(request.Card.CommandId), Guid.Parse(request.Card.PlayerId), Guid.Parse(request.Card.GameId), request.Card.Type);
            DbHelper.AddCard(Guid.Parse(request.Card.TurnamentId), Guid.Parse(request.Card.CommandId), Guid.Parse(request.Card.PlayerId), Guid.Parse(request.Card.GameId), request.Card.Type);
        }
    }
}
