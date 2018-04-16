"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NewsBriefly = (function () {
    function NewsBriefly(foto, title, text, date, type, urlVideo, urlFoto) {
        this.foto = foto;
        this.title = title;
        this.text = text;
        this.date = date;
        this.type = type;
        this.urlVideo = urlVideo;
        this.urlFoto = urlFoto;
    }
    return NewsBriefly;
}());
exports.NewsBriefly = NewsBriefly;
var UrlContent = (function () {
    function UrlContent(url) {
        this.url = url;
    }
    return UrlContent;
}());
exports.UrlContent = UrlContent;
//# sourceMappingURL=news.js.map