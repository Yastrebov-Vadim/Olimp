"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
var public_1 = require("../../services/public");
var page_1 = require("../../services/page");
var news_1 = require("../../model/news");
var News = (function () {
    function News(toastr, vcr, home, pageService) {
        this.toastr = toastr;
        this.vcr = vcr;
        this.home = home;
        this.pageService = pageService;
        var self = this;
        self.getNews();
        var urlVideo = 'http://vjs.zencdn.net/v/oceans.mp4';
        var urlFoto = new Array();
        urlFoto.push('url(./content/img/slade_home/slade1.jpg)');
        urlFoto.push('url(./content/img/slade_home/slade2.jpg)');
        urlFoto.push('url(./content/img/slade_home/slade3.jpg)');
        urlFoto.push('url(./content/img/slade_home/slade4.jpg)');
        urlFoto.push('url(./content/img/slade_home/slade5.jpg)');
        urlFoto.push('url(./content/img/slade_home/slade1.jpg)');
        urlFoto.push('url(./content/img/slade_home/slade2.jpg)');
        urlFoto.push('url(./content/img/slade_home/slade3.jpg)');
        urlFoto.push('url(./content/img/slade_home/slade4.jpg)');
        urlFoto.push('url(./content/img/slade_home/slade5.jpg)');
        var news = new news_1.NewsBriefly('url(./content/img/slade_home/slade1.jpg)', 'В новом мини-футбольном сезоне 2017/18', 'Предлагаем всем желающим командам заявиться на III чемпионат Саратова по мини-футболу среди любительских команд. Организатором данного турнира является спортивное общество "Олимп"...', '12.12.2017', 1, null, null);
        var news2 = new news_1.NewsBriefly(null, 'Новый турнир', null, '12.12.2017', 2, urlVideo, urlFoto);
        var news4 = new news_1.NewsBriefly(null, 'Новый турнир', null, '12.12.2017', 2, '/content/video/videogular.mp4', urlFoto);
        var news3 = new news_1.NewsBriefly(null, 'Фотоотчет сезоне 2017/18', null, '12.12.2017', 3, urlVideo, urlFoto);
        this.newss = new Array();
        this.newss.push(news);
        this.newss.push(news3);
        this.newss.push(news2);
        this.newss.push(news);
        this.newss.push(news3);
        this.newss.push(news4);
        this.newss.push(news);
    }
    News.prototype.ngOnInit = function () {
        var self = this;
        self.pageService.recipeSelected.emit(4);
    };
    News.prototype.showImg = function (url, index) {
        var self = this;
        document.getElementById("display" + index).style.backgroundImage = url;
    };
    News.prototype.getNews = function () {
        var self = this;
    };
    News = __decorate([
        core_1.Component({
            selector: 'news',
            templateUrl: './news.html'
        }),
        __metadata("design:paramtypes", [ng2_toastr_1.ToastsManager,
            core_1.ViewContainerRef,
            public_1.HomeService,
            page_1.PageService])
    ], News);
    return News;
}());
exports.News = News;
//# sourceMappingURL=news.js.map