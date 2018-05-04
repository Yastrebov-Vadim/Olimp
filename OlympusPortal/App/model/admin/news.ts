import { FileBd } from '../../model/admin/file';
import { CommandFilter } from '../../model/user/command';

export class GetNews {
    public id: string;
    public title: string;
    public text: string;
    public date: string;
    public type: number;
    public top: boolean;
    public urlVideo: string;
    public photo: FileBd[];
    public commandOne: CommandFilter;
    public commandTwo: CommandFilter;

    constructor(id: string, title: string, text: string, date: string, type: number, top: boolean, urlVideo: string, photo: FileBd[], commandOne: CommandFilter, commandTwo: CommandFilter) {
        this.id = id;
        this.title = title;
        this.text = text;
        this.date = date;
        this.type = type;
        this.top = top;
        this.urlVideo = urlVideo;
        this.photo = photo;
        this.commandOne = commandOne;
        this.commandTwo = commandTwo;
    }
}

export class GetNewsInfo {
    public id: string;
    public title: string;
    public date: string;
    public type: number;
    public top: boolean;
    public active: boolean;

    constructor(id: string, title: string, date: string, type: number, top: boolean, active: boolean) {
        this.id = id;
        this.title = title;
        this.date = date;
        this.type = type;
        this.top = top;
        this.active = active;
    }
}

export class SetNews {
    public id: string;
    public title: string;
    public text: string;
    public top: boolean;
    public commandOne: CommandFilter;
    public commandTwo: CommandFilter;

    constructor(id: string, title: string, text: string, top: boolean, commandOne: CommandFilter, commandTwo: CommandFilter) {
        this.id = id;
        this.title = title;
        this.text = text;
        this.top = top;
        this.commandOne = commandOne;
        this.commandTwo = commandTwo;
    }
}

export class UrlPhotosNews {
    public url: string[];

    constructor(url: string[]) {
        this.url = url;
    }
}
