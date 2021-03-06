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
var news_1 = require("../../../services/user/news");
var page_1 = require("../../../services/page");
var newsRequest_1 = require("../../../classes/user/requests/newsRequest");
var News = (function () {
    function News(toastr, vcr, newsService, pageService) {
        this.toastr = toastr;
        this.vcr = vcr;
        this.newsService = newsService;
        this.pageService = pageService;
        var self = this;
        self.getNews();
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
        self.busy = self.newsService.GetNewsActive(new newsRequest_1.TopRequest(false)).then(function (response) {
            self.newss = response.news;
        });
    };
    News = __decorate([
        core_1.Component({
            selector: 'news',
            templateUrl: './news.html'
        }),
        __metadata("design:paramtypes", [ng2_toastr_1.ToastsManager,
            core_1.ViewContainerRef,
            news_1.NewsService,
            page_1.PageService])
    ], News);
    return News;
}());
exports.News = News;
//# sourceMappingURL=news.js.map