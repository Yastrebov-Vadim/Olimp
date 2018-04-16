import { Command } from '../../model/command';

export class CommandsResponse {
    public commands: Command[];

    constructor(commands: Command[]) {
        this.commands = commands;
    }
}