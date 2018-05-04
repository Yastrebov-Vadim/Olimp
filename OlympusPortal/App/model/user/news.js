"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GetNews = (function () {
    function GetNews(id, title, text, date, type, urlVideo, urlPhoto) {
        this.id = id;
        this.title = title;
        this.text = text;
        this.date = date;
        this.type = type;
        this.urlVideo = urlVideo;
        this.urlPhoto = urlPhoto;
    }
    return GetNews;
}());
exports.GetNews = GetNews;
var UrlContent = (function () {
    function UrlContent(url) {
        this.url = url;
    }
    return UrlContent;
}());
exports.UrlContent = UrlContent;
//# sourceMappingURL=news.js.map