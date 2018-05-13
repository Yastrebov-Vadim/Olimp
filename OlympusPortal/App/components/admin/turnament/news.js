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
var NewsAdmin = (function () {
    function NewsAdmin(toastr, pageService, router, http) {
        this.toastr = toastr;
        this.pageService = pageService;
        this.router = router;
        this.http = http;
        var self = this;
    }
    NewsAdmin.prototype.ngOnInit = function () {
        var self = this;
        self.pageService.recipeSelected.emit(8);
    };
    NewsAdmin = __decorate([
        core_1.Component({
            selector: 'news-admin',
            templateUrl: './news.html'
        }),
        __metadata("design:paramtypes", [ng2_toastr_1.ToastsManager,
            page_1.PageService,
            router_1.Router,
            http_1.Http])
    ], NewsAdmin);
    return NewsAdmin;
}());
exports.NewsAdmin = NewsAdmin;
//# sourceMappingURL=news.js.map