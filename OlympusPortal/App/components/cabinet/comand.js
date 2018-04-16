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
var test_1 = require("../../classes/test");
var account_1 = require("../../services/account");
var Comand = (function () {
    function Comand(toastr, vcr, home, pageService) {
        this.toastr = toastr;
        this.vcr = vcr;
        this.home = home;
        this.pageService = pageService;
    }
    Comand.prototype.ngOnInit = function () {
        var self = this;
        self.pageService.recipeSelected.emit(3);
    };
    Comand.prototype.ActiveBank = function (bank) {
        var self = this;
        self.busy = self.home.GetProperty(new test_1.Paramtrs("Хрень")).then(function (response) {
            self.bank = response;
        });
    };
    Comand = __decorate([
        core_1.Component({
            selector: 'command',
            templateUrl: './comand.html'
        }),
        __metadata("design:paramtypes", [ng2_toastr_1.ToastsManager,
            core_1.ViewContainerRef,
            public_1.HomeService,
            account_1.PageService])
    ], Comand);
    return Comand;
}());
exports.Comand = Comand;
//# sourceMappingURL=comand.js.map