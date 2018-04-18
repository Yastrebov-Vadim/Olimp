using Olimp.BLL.Models;
using Olimp.DAL.Assest;
using System;
using System.Collections.Generic;

namespace Olimp.BLL.Operations
{
    public class EditAccountInfoBLL
    {
        public static void Execute(Guid id, EditAccountRequest request)
        {
            var commands = new List<DAL.Models.Player>();

            request.Command.ForEach(x =>
            {
                var player = new DAL.Models.Player
                {
                    MiddleName = x.MiddleName,
                    Name = x.Name,
                    Number = x.Number,
                    PlayerId = x.PlayerId,
                    Surname = x.Surname
                };

                commands.Add(player);
            });

            var account = new DAL.Models.EditAccountRequest
            {
                Command = commands,
                Email = request.Email,
                Foto = request.Foto,
                Name = request.Name,
                Phone = request.Phone
            };

            DbHelper.EditAccountInfo(id, account);
        }
    }
}
