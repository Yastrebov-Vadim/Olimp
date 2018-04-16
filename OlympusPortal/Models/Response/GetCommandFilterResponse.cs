using System.Collections.Generic;

namespace OlympusPortal.Models.Response
{
    public class GetCommandFilterResponse
    {
        public List<CommandFilter> CommandFilter { get; set; }

        public GetCommandFilterResponse(List<CommandFilter> commandFilter)
        {
            CommandFilter = commandFilter;
        }
    }
}