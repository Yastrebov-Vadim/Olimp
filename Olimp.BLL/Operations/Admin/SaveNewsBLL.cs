using Olimp.BLL.Models;
using Olimp.DAL.Assest;

namespace Olimp.BLL.Operations
{
    public class SaveNewsBLL
    {
        public static void Execute(SaveNewsRequest request)
        {
            DbHelper.SaveNews(request.Id, request.Title, request.Text, request.Top, request.CommandOne, request.CommandTwo);
        }
    }
}
