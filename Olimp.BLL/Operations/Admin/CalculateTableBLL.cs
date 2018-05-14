using Olimp.BLL.Models;
using Olimp.DAL.Assest;
using Olimp.DAL.DTO;
using System;

namespace Olimp.BLL.Operations
{
    public class CalculateTableBLL
    {
        public static int commandSize;
        public static position_command_for_turnament[,][] table = new position_command_for_turnament[0, 0][];

        public static void Execute(ElementRequest request)
        {
            var turnamentId = Guid.Parse(request.Txt);
            var command = DbHelper.GetCommandForTurnament(turnamentId);

            for (int i = command.Count - 1; i >= 1; i--)
            {
                Random rand = new Random();
                int j = rand.Next(i + 1);
                var temp = command[j];
                command[j] = command[i];
                command[i] = temp;
            }

            DbHelper.СreatePositionCommand(command, turnamentId);

            CreateTour(turnamentId);
        }

        public static void CreateTour(Guid turnamentId)
        {
            var positions = DbHelper.GetPositionCommand(turnamentId);

            positions.Sort((a, b) => a.position <= b.position ? -1 : 1);

            commandSize = positions.Count;

            table = new position_command_for_turnament[commandSize - 1, commandSize / 2][];

            for (var row = 0; row < commandSize - 1; row++)
            {
                for (var col = 0; col < commandSize / 2; col++)
                {

                    if (row == 0)
                        table[row, col] = new position_command_for_turnament[2] { positions[col], positions[commandSize - 1 - col] };

                    if (row != 0 && row != commandSize - 2)
                        if ((row + 1) % 2 == 0)
                        {
                            if (col == 0)
                                table[row, col] = new position_command_for_turnament[2] { table[row - 1, col + 1][1], table[row - 1, col][0] };

                            if (col == commandSize / 2 - 1)
                                if (commandSize / 2 > 2)
                                    table[row, col] = new position_command_for_turnament[2] { table[row - 1, col - 1][0], table[row - 1, col][0] };
                                else
                                    table[row, col] = new position_command_for_turnament[2] { table[row - 1, col - 1][1], table[row - 1, col][0] };
                            if (col != 0 && col != commandSize / 2 - 1)
                            {
                                if (col > 1)
                                    table[row, col] = new position_command_for_turnament[2] { table[row - 1, col - 1][0], table[row - 1, col + 1][1] };
                                else
                                    table[row, col] = new position_command_for_turnament[2] { table[row - 1, col - 1][1], table[row - 1, col + 1][1] };
                            }
                        }
                        else
                        {
                            if (col == 0)
                                table[row, col] = new position_command_for_turnament[2] { table[row - 1, col][1], table[row - 1, col + 1][1] };
                            if (col == commandSize / 2 - 1)
                                if (commandSize / 2 > 2)
                                    table[row, col] = new position_command_for_turnament[2] { table[row - 1, col - 1][0], table[row - 1, col][0] };
                            if (col != 0 && col != commandSize / 2 - 1)
                                table[row, col] = new position_command_for_turnament[2] { table[row - 1, col - 1][0], table[row - 1, col + 1][1] };
                        }

                    if (row == commandSize - 2)
                    {
                        if (col == 0)
                            table[row, col] = new position_command_for_turnament[2] { positions[0], positions[1] };
                        else
                            table[row, col] = new position_command_for_turnament[2] { positions[col + 1], positions[commandSize - col] };
                    }
                }
            }

            for (var row = 0; row < commandSize - 1; row++)
            {
                for (var col = 0; col < commandSize / 2; col++)
                {
                    DbHelper.СreateGameForTurnament(turnamentId, table[row, col][0].id_command, table[row, col][1].id_command, table[row, col][0].command_name, table[row, col][1].command_name, row + 1);
                }
            }
        }
    }
}
