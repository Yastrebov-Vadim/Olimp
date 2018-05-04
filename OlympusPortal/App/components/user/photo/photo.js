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
var Photo = (function () {
    function Photo(toastr, vcr, home, pageService) {
        this.toastr = toastr;
        this.vcr = vcr;
        this.home = home;
        this.pageService = pageService;
        this.photos = new Array();
        this.display = new photo_1.Display(null, null);
        this.commandsId = new Array();
        this.myDatePickerOptions = {
            dateFormat: 'dd.mm.yyyy'
        };
        var self = this;
        self.getPhoto();
        self.getCommandFilter();
    }
    Photo.prototype.ngOnInit = function () {
        var self = this;
        self.pageService.recipeSelected.emit(5);
    };
    Photo.prototype.getPhoto = function () {
        var self = this;
        self.busy = self.home.GetPhoto().then(function (response) {
            self.display.url = response.photos[0].url;
            self.display.position = 0;
            self.photos = response.photos;
            for (var i = 0; i < self.photos.length; i++) {
                self.photos[i].isShow = true;
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
            self.commandsId.push(id);
        }
        else {
            for (var i = 0; i < self.commandsId.length; i++) {
                if (self.commandsId[i] == id)
                    self.commandsId.splice(i, 1);
            }
        }
    };
    Photo.prototype.photoStyle = function (isShow) {
        if (isShow)
            return { "display": "inline-block" };
        else
            return { "display": "none" };
    };
    Photo.prototype.photoShowStyle = function () {
        var self = this;
        var top = (window.outerHeight - 700) / 2;
        return {
            "margin-top": top + "px"
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
            self.display.position = self.photos.length - 1;
        else
            self.display.position--;
        self.display.url = self.photos[self.display.position].url;
    };
    Photo.prototype.nextRightPhoto = function () {
        var self = this;
        if (self.display.position >= self.photos.length - 1)
            self.display.position = 0;
        else
            self.display.position++;
        self.display.url = self.photos[self.display.position].url;
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