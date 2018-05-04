using Olimp.BLL.Models;
using Olimp.BLL.Models.Response;
using Olimp.DAL.Assest;
using System.Collections.Generic;

namespace Olimp.BLL.Operations
{
    public class GetPhotoBLL
    {
        public static GetPhototResponse Execute()
        {
            var photos = DbHelper.GetPhoto();

            var response = new GetPhototResponse { Photos = new List<PhotoCommand>() };

            foreach (var photo in photos)
            {
                var item = new PhotoCommand
                {
                    Url = photo.url_bd,
                    CommandOne = photo.id_command_one.ToString(),
                    CommandTwo = photo.id_command_two.ToString(),
                    //  DateAdd = photo.,
                };

                response.Photos.Add(item);
            }

            return response;
        }
    }
}
