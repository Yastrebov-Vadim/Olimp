using System.Collections.Generic;

namespace Olimp.BLL.Models
{
    public class GroupTourNumber
    {
        public int NumberTour { get; set; }
        public List<GroupDateStart> GroupDateStart { get; set; }
    }
}