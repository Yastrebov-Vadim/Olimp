using Olimp.BLL.Models;
using Olimp.BLL.Models.Response;
using Olimp.DAL.Assest;
using System;
using System.Collections.Generic;

namespace Olimp.BLL.Operations
{
    public class DivideForDayBLL
    {
        public static void Execute(DivideForDayRequest request)
        {
            var days = new List<DateTime>();
            var arens = new List<string>();

            request.Days.ForEach(x =>
            {
                days.Add(x.Day);
                arens.Add(x.Arena);
            });

            DbHelper.DivideForDay(Guid.Parse(request.TurnamentId), request.Tour, days, arens);
        }
    }
}
