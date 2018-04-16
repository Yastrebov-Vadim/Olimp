import { CommandFilter } from '../../model/command';

export class CommandFilterResponse {
    public commandFilter: CommandFilter[];

    constructor(commandFilter: CommandFilter[]) {
        this.commandFilter = commandFilter;
    }
}