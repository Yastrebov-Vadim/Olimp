import { CommandFilter } from '../../../model/user/command';

export class CommandFilterResponse {
    public commandFilter: CommandFilter[];

    constructor(commandFilter: CommandFilter[]) {
        this.commandFilter = commandFilter;
    }
}