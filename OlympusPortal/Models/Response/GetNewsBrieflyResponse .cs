using System.Collections.Generic;

namespace OlympusPortal.Models.Response
{
    public class GetNewsBrieflyResponse
    {
        public List<NewsBriefly> NewsBriefly { get; set; }

        public GetNewsBrieflyResponse(List<NewsBriefly> newsBriefly)
        {
            NewsBriefly = newsBriefly;
        }
    }
}

