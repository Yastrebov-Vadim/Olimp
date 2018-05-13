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
var page_1 = require("../../../services/page");
var photo_1 = require("../../../model/user/photo");
var photoRequest_1 = require("../../../classes/user/requests/photoRequest");
var photoResponse_1 = require("../../../classes/user/response/photoResponse");
var Photo = (function () {
    function Photo(toastr, vcr, home, pageService) {
        this.toastr = toastr;
        this.vcr = vcr;
        this.home = home;
        this.pageService = pageService;
        this.pagePhotos = new photoResponse_1.GetPhotoResponse(null, null, null);
        this.display = new photo_1.Display(null, null);
        this.pageSize = new Array();
        var self = this;
        self.getPhoto(1);
        self.getCommandFilter();
    }
    Photo.prototype.ngOnInit = function () {
        var self = this;
        self.pageService.recipeSelected.emit(5);
    };
    Photo.prototype.getPhoto = function (page) {
        var self = this;
        self.busy = self.home.GetPhoto(new photoRequest_1.GetPhotoRequest(page, self.commandId)).then(function (response) {
            self.pagePhotos = response;
            self.pageSize = new Array();
            for (var i = 2; i < self.pagePhotos.pageSize; i++) {
                self.pageSize.push(i);
            }
        });
    };
    Photo.prototype.getCommandFilter = function () {
        var self = this;
        self.busy = self.home.GetCommandFilter().then(function (response) {
            self.commandFilter = response.commandFilter;
        });
    };
    Photo.prototype.filterCommand = function (id, checked) {
        var self = this;
        if (checked) {
            self.commandId = id;
            self.getPhoto(self.pagePhotos.currentPage);
        }
        else {
            self.commandId = null;
            self.getPhoto(self.pagePhotos.currentPage);
        }
    };
    Photo.prototype.photoShowStyle = function () {
        var self = this;
        var top = (window.outerHeight - 700) / 2;
        return {
            "margin-top": top + "px"
        };
    };
    Photo.prototype.pageStyle = function (page) {
        var self = this;
        if ((self.pagePhotos.currentPage + 2 < page || self.pagePhotos.currentPage - 2 > page) && (page != self.pagePhotos.pageSize && page != 1))
            return {
                "display": "none"
            };
        if (self.pagePhotos.currentPage == page)
            return {
                "color": "#00ff2d",
                "font-size": "20px"
            };
    };
    Photo.prototype.openPhoto = function (url, position) {
        var self = this;
        self.display.url = url;
        self.display.position = position;
        document.getElementById("photo-layer").style.display = "block";
    };
    Photo.prototype.closePhoto = function () {
        document.getElementById("photo-layer").style.display = "none";
    };
    Photo.prototype.nextLeftPhoto = function () {
        var self = this;
        if (self.display.position <= 0)
            self.display.position = self.pagePhotos.photos.length - 1;
        else
            self.display.position--;
        self.display.url = self.pagePhotos.photos[self.display.position];
    };
    Photo.prototype.nextRightPhoto = function () {
        var self = this;
        if (self.display.position >= self.pagePhotos.photos.length - 1)
            self.display.position = 0;
        else
            self.display.position++;
        self.display.url = self.pagePhotos.photos[self.display.position];
    };
    Photo.prototype.nextLeftPage = function () {
        var self = this;
        if (self.pagePhotos.currentPage <= 1)
            return;
        self.getPhoto(self.pagePhotos.currentPage - 1);
    };
    Photo.prototype.nextRightPage = function () {
        var self = this;
        if (self.pagePhotos.pageSize < self.pagePhotos.currentPage + 1)
            return;
        self.getPhoto(self.pagePhotos.currentPage + 1);
    };
    Photo.prototype.getPage = function (page) {
        var self = this;
        if (self.pagePhotos.currentPage == page)
            return;
        self.getPhoto(page);
    };
    Photo = __decorate([
        core_1.Component({
            selector: 'photo',
            templateUrl: './photo.html'
        }),
        __metadata("design:paramtypes", [ng2_toastr_1.ToastsManager,
            core_1.ViewContainerRef,
            public_1.HomeService,
            page_1.PageService])
    ], Photo);
    return Photo;
}());
exports.Photo = Photo;
//# sourceMappingURL=photo.js.map