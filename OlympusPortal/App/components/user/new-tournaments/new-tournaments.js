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
var page_1 = require("../../../services/page");
var email_1 = require("../../../services/user/email");
var NewTournaments = (function () {
    function NewTournaments(toastr, vcr, pageService, emailService) {
        this.toastr = toastr;
        this.vcr = vcr;
        this.pageService = pageService;
        this.emailService = emailService;
        this.isChecked = true;
    }
    NewTournaments.prototype.ngOnInit = function () {
        var self = this;
        self.pageService.recipeSelected.emit(2);
    };
    NewTournaments.prototype.showcommand = function (id) {
        var self = this;
        document.getElementById(id).style.display = "block";
    };
    NewTournaments.prototype.getNews = function () {
    };
    NewTournaments = __decorate([
        core_1.Component({
            selector: 'new-tournaments',
            templateUrl: './new-tournaments.html'
        }),
        __metadata("design:paramtypes", [ng2_toastr_1.ToastsManager,
            core_1.ViewContainerRef,
            page_1.PageService,
            email_1.EmailService])
    ], NewTournaments);
    return NewTournaments;
}());
exports.NewTournaments = NewTournaments;
//# sourceMappingURL=new-tournaments.js.map