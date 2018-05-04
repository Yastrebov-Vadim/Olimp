import { Player } from './account';

export class Command {
    public photo: string;
    public name: string;
    public command: Player[];

    constructor(photo: string, name: string, phone: string, email: string, command: Player[]) {
        this.photo = photo;
        this.name = name;
        this.command = command;
    }
}

export class CommandFilter {
    public name: string;
    public id: string;

    constructor(name: string, id: string) {
        this.name = name;
        this.id = id;
    }
}

export class CommandsId {
    public id: string;

    constructor(id: string) {
        this.id = id;
    }
}