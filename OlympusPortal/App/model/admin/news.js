"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GetNews = (function () {
    function GetNews(id, title, text, date, type, top, urlVideo, photo, commandOne, commandTwo) {
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
    return GetNews;
}());
exports.GetNews = GetNews;
var GetNewsInfo = (function () {
    function GetNewsInfo(id, title, date, type, top, active) {
        this.id = id;
        this.title = title;
        this.date = date;
        this.type = type;
        this.top = top;
        this.active = active;
    }
    return GetNewsInfo;
}());
exports.GetNewsInfo = GetNewsInfo;
var SetNews = (function () {
    function SetNews(id, title, text, top, commandOne, commandTwo) {
        this.id = id;
        this.title = title;
        this.text = text;
        this.top = top;
        this.commandOne = commandOne;
        this.commandTwo = commandTwo;
    }
    return SetNews;
}());
exports.SetNews = SetNews;
var UrlPhotosNews = (function () {
    function UrlPhotosNews(url) {
        this.url = url;
    }
    return UrlPhotosNews;
}());
exports.UrlPhotosNews = UrlPhotosNews;
//# sourceMappingURL=news.js.map