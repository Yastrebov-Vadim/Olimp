import { Command } from '../../../model/user/command';

export class CommandsResponse {
    public commands: Command[];

    constructor(commands: Command[]) {
        this.commands = commands;
    }
}