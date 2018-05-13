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
var router_1 = require("@angular/router");
var news_1 = require("../../../services/admin/news");
var file_1 = require("../../../services/admin/file");
var public_1 = require("../../../services/user/public");
var ElementRequest_1 = require("../../../classes/admin/requests/ElementRequest");
var news_2 = require("../../../model/admin/news");
var common_1 = require("../../../model/user/common");
var news_3 = require("../../../model/admin/news");
var AddNews = (function () {
    function AddNews(toastr, newsService, fileService, home, router, route) {
        this.toastr = toastr;
        this.newsService = newsService;
        this.fileService = fileService;
        this.home = home;
        this.router = router;
        this.route = route;
        this.videos = new Array();
        this.news = new news_3.GetNews(null, null, null, null, null, null, null, null, null, null);
        this.files = new Array();
        var self = this;
        route.queryParams.subscribe(function (params) {
            self.id = params["key"];
        });
        self.getNews(self.id);
        self.getCommandFilter();
    }
    AddNews.prototype.ngOnInit = function () {
    };
    AddNews.prototype.getNews = function (id) {
        var self = this;
        self.busy = self.newsService.GetNews(new ElementRequest_1.ElementRequest(id)).then(function (response) {
            self.news = response.news;
            self.videos.push(response.news.urlVideo);
        });
    };
    AddNews.prototype.fileChangedTypeText = function (e) {
        var self = this;
        var target = e.target;
        var formData = new FormData();
        formData.append("image", target.files[0], self.id);
        self.busy = self.fileService.AddImgNewsTypeText(formData).then(function (response) {
            self.news.photo[0].url = response.photo.url;
            self.toastr.success("Изображение загружено");
        });
    };
    AddNews.prototype.fileChangedTypePhoto = function (e) {
        var self = this;
        self.files = [];
        var target = e.target;
        for (var i = 0; i < target.files.length; i++) {
            self.files.push(target.files[i]);
        }
        self.loadImg(0);
    };
    AddNews.prototype.fileChangedVideo = function (e) {
        var self = this;
        var target = e.target;
        var formData = new FormData();
        formData.append("video", target.files[0], self.id);
        self.busy = self.fileService.AddVideoForNews(formData).then(function (response) {
            self.videos[0] = response.txt;
            self.toastr.success("Видео загружено");
        });
    };
    AddNews.prototype.loadImg = function (i) {
        var self = this;
        var formData = new FormData();
        formData.append("image", self.files[i], self.id);
        self.busy = self.fileService.AddImgNewsTypePhoto(formData).then(function (response) {
            self.news.photo.push(response.photo);
            if (i < self.files.length - 1)
                self.loadImg(i + 1);
            else
                self.toastr.success("Загружено");
        });
    };
    AddNews.prototype.saveNews = function () {
        var self = this;
        if (self.news.title == (null || "") || self.news.text == (null || "")) {
            self.toastr.error("Не все поля заполнены");
            return;
        }
        self.busy = self.newsService.SaveNews(new news_2.SetNews(self.news.id, self.news.title, self.news.text, self.news.top, self.news.commandOne, self.news.commandTwo)).then(function (response) {
            self.toastr.success("Сохранено");
        });
    };
    AddNews.prototype.back = function () {
        var self = this;
        self.router.navigate([common_1.Common.RoutePaths.Admin + common_1.Common.RoutePaths.Slash + common_1.Common.RoutePaths.News], {});
    };
    AddNews.prototype.preview = function () {
        var self = this;
        document.getElementById("preview-layer").style.display = "block";
    };
    AddNews.prototype.close = function () {
        document.getElementById("preview-layer").style.display = "none";
    };
    AddNews.prototype.dellPhotoForNews = function (id, i) {
        var self = this;
        self.busy = self.fileService.DellPhoto(new ElementRequest_1.ElementRequest(id)).then(function (response) {
            self.news.photo.splice(i, 1);
            self.toastr.success("Удалено");
        });
    };
    AddNews.prototype.isPhoto = function () {
        var self = this;
        return self.news.photo.length > 0;
    };
    AddNews.prototype.getCommandFilter = function () {
        var self = this;
        self.busy = self.home.GetCommandFilter().then(function (response) {
            self.commandFilter = response.commandFilter;
        });
    };
    AddNews = __decorate([
        core_1.Component({
            selector: 'add-news',
            templateUrl: './add-news.html'
        }),
        __metadata("design:paramtypes", [ng2_toastr_1.ToastsManager,
            news_1.NewsAdminService,
            file_1.FileService,
            public_1.HomeService,
            router_1.Router,
            router_1.ActivatedRoute])
    ], AddNews);
    return AddNews;
}());
exports.AddNews = AddNews;
//# sourceMappingURL=add-news.js.map