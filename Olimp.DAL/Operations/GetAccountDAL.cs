using Olimp.BLL.Assest;
using System;

namespace Olimp.DAL.Operations
{
    public class GetAccountDAL
    {
        public static string Execute(Guid id)
        {
            var account = DbHelper.GetAccount(id);

            if (account == null)
                throw new ApplicationException("Не найдена команда в системе. Обратитесь к администратору.");

            return account.command_name;
        }
    }
}
