export class GetNews {
    public id: string;
    public title: string;
    public text: string;
    public date: string;
    public type: number;
    public urlVideo: string;
    public urlPhoto: string[];


    constructor(id: string, title: string, text: string, date: string, type: number, urlVideo: string, urlPhoto: string[]) {
        this.id = id;
        this.title = title;
        this.text = text;
        this.date = date;
        this.type = type;
        this.urlVideo = urlVideo;
        this.urlPhoto = urlPhoto;
    }
}

export class UrlContent {
    public url: string;

    constructor(url: string) {
        this.url = url;
    }
}
