using Olimp.BLL.Models;
using Olimp.BLL.Models.Response;
using Olimp.DAL.Assest;
using System;
using System.Collections.Generic;

namespace Olimp.BLL.Operations
{
    public class GetPhotoBLL
    {
        public static GetPhototResponse Execute(GetPhotoRequest request)
        {
            var pagePhotos = DbHelper.GetPhoto(request.Page, request.Id);

            var response = new GetPhototResponse
            {
                Photos = new List<string>(),
                PageSize = pagePhotos.Item2,
                CurrentPage = pagePhotos.Item3

            };

            foreach (var photo in pagePhotos.Item1)
            {
                response.Photos.Add(photo.url_bd);
            }

            return response;
        }
    }
}
