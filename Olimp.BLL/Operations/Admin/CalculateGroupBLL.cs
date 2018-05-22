using Olimp.BLL.Models;
using Olimp.DAL.Assest;
using Olimp.DAL.DTO;
using System.Linq;
using System;

namespace Olimp.BLL.Operations
{
    public class CalculateGroupBLL
    {
        public static int commandSize;
        public static position_command_for_turnament[,][] table = new position_command_for_turnament[0, 0][];

        public static void Execute(CalculateGroupRequest request)
        {
            var turnamentId = Guid.Parse(request.TurnamentId);
            var command = DbHelper.GetCommandForTurnament(turnamentId, false);

            if (command.Count < 6)
                throw new ApplicationException("Ошибка: Минимальное колличество комманд для проведения турнира 6");

            if (Math.Truncate(Convert.ToDecimal(command.Count / request.GroupCount)) < 3)
                throw new ApplicationException("Ошибка: Невозможно разделить команды на заданное колличество групп");

            for (int i = command.Count - 1; i >= 1; i--)
            {
                Random rand = new Random();
                int j = rand.Next(i + 1);
                var temp = command[j];
                command[j] = command[i];
                command[i] = temp;
            }

            var g = 0;
            var splits = from item in command
                         group item by g++ % request.GroupCount into part
                         select part.ToList();

            var groupCommand = splits.ToList();

           var groupsTurnament = DbHelper.СreateGroupForTurnament(turnamentId, groupCommand.Count);

            g = 0;
            groupCommand.ForEach(x => {
                DbHelper.СreatePositionCommand(x, groupsTurnament[g].id);
                CreateTour(groupsTurnament[g].id);
                g++;
            });
        }

        public static void CreateTour(Guid turnamentId)
        {
            var positions = DbHelper.GetPositionCommand(turnamentId);

            positions.Sort((a, b) => a.position <= b.position ? -1 : 1);

            if (positions.Count % 2 != 0)
                positions.Add(new position_command_for_turnament
                {
                    fake_code = true
                });

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
                    DbHelper.СreateGameForTurnament(turnamentId, table[row, col][0].id_command, table[row, col][1].id_command, table[row, col][0].command_name, table[row, col][1].command_name, row + 1, table[row, col][0].fake_code || table[row, col][1].fake_code);
                }
            }
        }
    }
}
