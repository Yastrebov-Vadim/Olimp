using Olimp.BLL.Assest;
using Olimp.DAL.Models;
using Olimp.DAL.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Olimp.DAL.Operations
{
    public class EditAccountInfoDAL
    {
        public static void Execute(Guid id, EditAccountRequest request)
        {
            var commands = new List<BLL.Models.Player>();

            request.Command.ForEach(x =>
            {
                var player = new BLL.Models.Player
                {
                    MiddleName = x.MiddleName,
                    Name = x.Name,
                    Number = x.Number,
                    PlayerId = x.PlayerId,
                    Surname = x.Surname
                };

                commands.Add(player);
            });

            var account = new BLL.Models.EditAccountRequest
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
