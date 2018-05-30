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
var turnament_1 = require("../../../services/user/turnament");
var command_1 = require("../../../model/user/command");
var elementtRequest_1 = require("../../../classes/user/requests/elementtRequest");
var elementTypeRequest_1 = require("../../../classes/user/requests/elementTypeRequest");
var NewTournaments = (function () {
    function NewTournaments(toastr, vcr, pageService, turnamentService) {
        this.toastr = toastr;
        this.vcr = vcr;
        this.pageService = pageService;
        this.turnamentService = turnamentService;
        this.isChecked = false;
        this.isTur = false;
    }
    NewTournaments.prototype.ngOnInit = function () {
        var self = this;
        self.pageService.recipeSelected.emit(2);
        self.getTournaments();
    };
    NewTournaments.prototype.getTournaments = function () {
        var self = this;
        self.busy = self.turnamentService.GetTurnaments(new elementTypeRequest_1.ElementTypeRequest(1)).then(function (response) {
            self.turnaments = response.turnaments;
            self.isTur = self.turnaments.length > 0;
            self.isChecked = self.turnaments.length < 2;
        });
    };
    NewTournaments.prototype.declareTournament = function (id, index) {
        var self = this;
        self.busy = self.turnamentService.DeclareTournament(new elementtRequest_1.ElementRequest(id)).then(function (response) {
            self.turnaments[index].commands.push(new command_1.CommandForTurnament(null, response.txt, false));
            self.toastr.success("Заявка подана");
        });
    };
    NewTournaments = __decorate([
        core_1.Component({
            selector: 'new-tournaments',
            templateUrl: './new-tournaments.html'
        }),
        __metadata("design:paramtypes", [ng2_toastr_1.ToastsManager,
            core_1.ViewContainerRef,
            page_1.PageService,
            turnament_1.TurnamentService])
    ], NewTournaments);
    return NewTournaments;
}());
exports.NewTournaments = NewTournaments;
//# sourceMappingURL=new-tournaments.js.map