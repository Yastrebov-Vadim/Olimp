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
var page_1 = require("../../services/page");
var CurrentTournaments = (function () {
    function CurrentTournaments(toastr, vcr, pageService) {
        this.toastr = toastr;
        this.vcr = vcr;
        this.pageService = pageService;
    }
    CurrentTournaments.prototype.ngOnInit = function () {
        var self = this;
        self.pageService.recipeSelected.emit(2);
    };
    CurrentTournaments = __decorate([
        core_1.Component({
            selector: 'current-tournaments',
            templateUrl: './current-tournaments.html'
        }),
        __metadata("design:paramtypes", [ng2_toastr_1.ToastsManager,
            core_1.ViewContainerRef,
            page_1.PageService])
    ], CurrentTournaments);
    return CurrentTournaments;
}());
exports.CurrentTournaments = CurrentTournaments;
//# sourceMappingURL=current-tournaments.js.map