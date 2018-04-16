export class Account {
    public foto: string;
    public name: string;
    public phone: string;
    public email: string;
    public command: Player[];
 

    constructor(foto: string, name: string, phone: string, email: string, command: Player[]) {
        this.foto = foto;
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.command = command;
    }
}

export class Player {
    public playerId: string;
    public name: string;
    public surname: string;
    public middleName: string;
    public number: number;
    
    constructor(playerId: string, name: string, surname: string, middleName: string, number: number) {
        this.playerId = playerId;
        this.name = name;
        this.surname = surname;
        this.middleName = middleName;
        this.number = number;
    }
}
