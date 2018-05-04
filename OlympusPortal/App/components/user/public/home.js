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
var public_1 = require("../../../services/user/public");
var newsRequest_1 = require("../../../classes/user/requests/newsRequest");
var page_1 = require("../../../services/page");
var news_1 = require("../../../services/user/news");
var Home = (function () {
    function Home(toastr, vcr, home, pageService, newsService) {
        this.toastr = toastr;
        this.vcr = vcr;
        this.home = home;
        this.pageService = pageService;
        this.newsService = newsService;
        this.isNews = false;
        var self = this;
        self.getNews();
    }
    Home.prototype.ngOnInit = function () {
        var self = this;
        self.pageService.recipeSelected.emit(1);
        var slides = document.querySelectorAll('#slides .slide');
        var currentSlide = 0;
        var slideInterval = setInterval(nextSlide, 5000);
        function nextSlide() {
            slides[currentSlide].className = 'slide';
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].className = 'slide showing';
        }
    };
    Home.prototype.showImg = function (url, index) {
        var self = this;
        document.getElementById("display" + index).style.backgroundImage = url;
    };
    Home.prototype.getNews = function () {
        var self = this;
        self.busy = self.newsService.GetNewsTop(new newsRequest_1.TopRequest(true)).then(function (response) {
            self.newss = response.news;
            self.isNews = self.newss.length > 0 ? true : false;
        });
    };
    Home = __decorate([
        core_1.Component({
            selector: 'home',
            templateUrl: './home.html'
        }),
        __metadata("design:paramtypes", [ng2_toastr_1.ToastsManager,
            core_1.ViewContainerRef,
            public_1.HomeService,
            page_1.PageService,
            news_1.NewsService])
    ], Home);
    return Home;
}());
exports.Home = Home;
//# sourceMappingURL=home.js.map