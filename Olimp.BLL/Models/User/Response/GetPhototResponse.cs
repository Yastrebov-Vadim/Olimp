using System.Collections.Generic;

namespace Olimp.BLL.Models.Response
{
    public class GetPhototResponse
    {
        public int CurrentPage { get; set; }
        public int PageSize { get; set; }
        public List<string> Photos { get; set; }
    }
}