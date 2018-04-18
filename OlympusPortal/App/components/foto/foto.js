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
var Foto = (function () {
    function Foto(toastr, vcr, home, pageService) {
        this.toastr = toastr;
        this.vcr = vcr;
        this.home = home;
        this.pageService = pageService;
        this.foto = new Array();
        this.dateTo = null;
        this.myDatePickerOptions = {
            dateFormat: 'dd.mm.yyyy'
        };
        var self = this;
        self.getCommandFilter();
        self.display = 'url(./content/img/slade_home/slade1.jpg)';
        self.foto.push('url(./content/img/slade_home/slade1.jpg)');
        self.foto.push('url(./content/img/slade_home/slade2.jpg)');
        self.foto.push('url(./content/img/slade_home/slade3.jpg)');
        self.foto.push('url(./content/img/slade_home/slade4.jpg)');
        self.foto.push('url(./content/img/slade_home/slade5.jpg)');
        self.foto.push('url(./content/img/slade_home/slade1.jpg)');
        self.foto.push('url(./content/img/slade_home/slade2.jpg)');
        self.foto.push('url(./content/img/ava.png)');
        self.foto.push('url(./content/img/slade_home/slade4.jpg)');
        self.foto.push('url(./content/img/slade_home/slade5.jpg)');
        self.foto.push('url(./content/img/slade_home/slade1.jpg)');
        self.foto.push('url(./content/img/background3.jpg)');
        self.foto.push('url(./content/img/slade_home/slade3.jpg)');
        self.foto.push('url(./content/img/slade_home/slade4.jpg)');
        self.foto.push('url(./content/img/slade_home/slade5.jpg)');
        self.foto.push('url(./content/img/slade_home/slade1.jpg)');
        self.foto.push('url(./content/img/slade_home/slade2.jpg)');
        self.foto.push('url(./content/img/slade_home/slade3.jpg)');
        self.foto.push('url(./content/img/slade_home/slade4.jpg)');
        self.foto.push('url(./content/img/slade_home/slade5.jpg)');
    }
    Foto.prototype.ngOnInit = function () {
        var self = this;
        self.pageService.recipeSelected.emit(5);
    };
    Foto.prototype.getCommandFilter = function () {
        var self = this;
        self.busy = self.home.GetCommandFilter().then(function (response) {
            self.commandFilter = response.commandFilter;
        });
    };
    Foto.prototype.showImg = function (url) {
        var self = this;
        self.display = url;
    };
    Foto.prototype.filterCommand = function (id, checked) {
        var self = this;
        console.dir(checked);
        var D = self.dateTo;
    };
    Foto.prototype.filterDate = function (event, type) {
        var self = this;
        switch (type) {
            case 1:
                console.dir("1- " + event);
                break;
            case 2:
                console.dir("2- " + event);
                break;
        }
    };
    Foto = __decorate([
        core_1.Component({
            selector: 'foto',
            templateUrl: './foto.html'
        }),
        __metadata("design:paramtypes", [ng2_toastr_1.ToastsManager,
            core_1.ViewContainerRef,
            public_1.HomeService,
            page_1.PageService])
    ], Foto);
    return Foto;
}());
exports.Foto = Foto;
//# sourceMappingURL=foto.js.map