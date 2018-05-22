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
var http_1 = require("@angular/http");
var page_1 = require("../../../services/page");
var news_1 = require("../../../services/admin/news");
var common_1 = require("../../../model/user/common");
var ElementRequest_1 = require("../../../classes/admin/requests/ElementRequest");
var NewsAdmin = (function () {
    function NewsAdmin(toastr, pageService, newsService, router, http) {
        this.toastr = toastr;
        this.pageService = pageService;
        this.newsService = newsService;
        this.router = router;
        this.http = http;
        this.isText = false;
        this.isPhoto = false;
        this.isVideo = false;
        this.idNews = null;
        this.index = null;
        this.type = 1;
        var self = this;
    }
    NewsAdmin.prototype.ngOnInit = function () {
        var self = this;
        self.pageService.recipeSelected.emit(8);
        self.getNewsInfo();
    };
    NewsAdmin.prototype.getNewsInfo = function () {
        var self = this;
        self.busy = self.newsService.GetNewsInfo().then(function (response) {
            self.newsInfo = response.news;
        });
    };
    NewsAdmin.prototype.addNews = function () {
        var self = this;
        if (!self.isText && !self.isPhoto && !self.isVideo) {
            self.toastr.error("Не выбран тип новости");
            return;
        }
        self.busy = self.newsService.AddNews(new ElementRequest_1.ElementRequest((self.isText ? 1 : self.isPhoto ? 2 : 3).toString())).then(function (response) {
            self.router.navigate([common_1.Common.RoutePaths.Admin + common_1.Common.RoutePaths.Slash + common_1.Common.RoutePaths.EditNews], {
                queryParams: {
                    key: response.txt
                }
            });
        });
    };
    NewsAdmin.prototype.selectNews = function (id, i) {
        var self = this;
        self.idNews = id;
        self.index = i;
    };
    NewsAdmin.prototype.dellNews = function () {
        var self = this;
        if (self.idNews == null && self.index == null)
            return;
        self.busy = self.newsService.DellNews(new ElementRequest_1.ElementRequest(self.idNews)).then(function (response) {
            self.newsInfo.splice(self.index, 1);
            self.idNews = null;
            self.index = null;
            self.toastr.success("Новость удалена");
        });
    };
    NewsAdmin.prototype.editNews = function (id) {
        var self = this;
        self.router.navigate([common_1.Common.RoutePaths.Admin + "/" + common_1.Common.RoutePaths.EditNews], {
            queryParams: {
                key: id
            }
        });
    };
    NewsAdmin.prototype.active = function (id) {
        var self = this;
        self.busy = self.newsService.ActiveNews(new ElementRequest_1.ElementRequest(id)).then(function (response) {
            self.toastr.success("Новость " + response.txt);
        });
    };
    NewsAdmin.prototype.getNewsForType = function (type) {
        var self = this;
        if (self.newsInfo)
            return self.newsInfo.filter(function (x) { return x.type == type; });
        else
            self.newsInfo;
    };
    NewsAdmin = __decorate([
        core_1.Component({
            selector: 'news-admin',
            templateUrl: './news.html'
        }),
        __metadata("design:paramtypes", [ng2_toastr_1.ToastsManager,
            page_1.PageService,
            news_1.NewsAdminService,
            router_1.Router,
            http_1.Http])
    ], NewsAdmin);
    return NewsAdmin;
}());
exports.NewsAdmin = NewsAdmin;
//# sourceMappingURL=news.js.map