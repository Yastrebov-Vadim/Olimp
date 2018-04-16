import { Player } from './account';

export class Command {
    public foto: string;
    public name: string;
    public command: Player[];

    constructor(foto: string, name: string, phone: string, email: string, command: Player[]) {
        this.foto = foto;
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