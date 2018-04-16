using System.Collections.Generic;

namespace OlympusPortal.Models.Response
{
    public class GetCommandsResponse
    {
        public List<Command> Commands { get; set; }

        public GetCommandsResponse(List<Command> commands)
        {
            Commands = commands;
        }
    }
}