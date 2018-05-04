export class PhotoCommand {
    public url: string;
    public commandOne: string;
    public commandTwo: string;
    public date: Date;
    public isShow: boolean;

    constructor(url: string, commandOne: string, commandTwo: string, date: Date, isShow: boolean) {
        this.url = url;
        this.commandOne = commandOne;
        this.commandTwo = commandTwo;
        this.date = date;
        this.isShow = isShow;
    }
}

export class Display {
    public url: string;
    public position: number;

    constructor(url: string, position: number) {
        this.url = url;
        this.position = position;
    }
}