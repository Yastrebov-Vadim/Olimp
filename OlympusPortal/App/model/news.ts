export class NewsBriefly {
    public foto: string;
    public title: string;
    public text: string;
    public date: string;
    public type: number;
    public urlVideo: string;
    public urlFoto: string[];
 

    constructor(foto: string, title: string, text: string, date: string, type: number, urlVideo?: string, urlFoto?: string[]) {
        this.foto = foto;
        this.title = title;
        this.text = text;
        this.date = date;
        this.type = type;
        this.urlVideo = urlVideo;
        this.urlFoto = urlFoto;

    }
}

export class UrlContent {
    public url: string;
    
    constructor(url: string) {
        this.url = url;
    }
}
