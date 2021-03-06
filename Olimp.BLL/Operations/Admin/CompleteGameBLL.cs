﻿using Olimp.BLL.Models;
using Olimp.DAL.Assest;
using System;

namespace Olimp.BLL.Operations
{
    public class CompleteGameBLL
    {
        public static void Execute(CompleteGameRequest request)
        {
            DbHelper.CompleteGame(Guid.Parse(request.TurnamentId), Guid.Parse(request.GameId));
            DbHelper.RemoveSkip(Guid.Parse(request.TurnamentId), Guid.Parse(request.GameId));
        }
    }
}
