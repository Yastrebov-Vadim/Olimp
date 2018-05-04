using Olimp.BLL.Models;
using Olimp.DAL.Assest;

namespace Olimp.BLL.Operations
{
    public class DellNewsBLL
    {
        public static void Execute(ElementRequest request)
        {
            var type = DbHelper.DellNews(request.Txt);

            switch (type)
            {
                case 1:
                case 2:
                    DbHelper.DellPhotoForNews(request.Txt);
                    break;
                case 3:
                    DbHelper.DellVideoForNews(request.Txt);
                    break;
            }
        }
    }
}