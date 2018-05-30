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
var turnament_2 = require("../../../model/user/turnament");
var elementTypeRequest_1 = require("../../../classes/user/requests/elementTypeRequest");
var PastTournaments = (function () {
    function PastTournaments(toastr, vcr, pageService, turnamentService) {
        this.toastr = toastr;
        this.vcr = vcr;
        this.pageService = pageService;
        this.turnamentService = turnamentService;
        this.isTur = false;
        this.page = 2;
    }
    PastTournaments.prototype.ngOnInit = function () {
        var self = this;
        self.pageService.recipeSelected.emit(2);
        self.getTournaments();
    };
    PastTournaments.prototype.getTournaments = function () {
        var self = this;
        self.busy = self.turnamentService.GetTurnaments(new elementTypeRequest_1.ElementTypeRequest(4)).then(function (response) {
            self.turnaments = response.turnaments;
            self.turnaments.forEach(function (x) {
                if (x.type == 1) {
                    x.tableTutnament = self.getTable(x.positionCommand, x.groupTourNumber);
                }
                else {
                    x.turnamentGroups.forEach(function (g) {
                        g.tableTutnament = self.getTable(g.positionCommand, g.groupTourNumber);
                    });
                }
            });
            self.isTur = self.turnaments.length > 0;
        });
    };
    PastTournaments.prototype.getResult = function (positionCommand, groupTourNumber, row, col) {
        var self = this;
        var commandOneId = positionCommand[row - 1].commandId;
        var commandTwoId = positionCommand[col - 1].commandId;
        var result = "";
        groupTourNumber.forEach(function (gt) { return gt.groupDateStart.forEach(function (gd) { return gd.gameTurnament.forEach(function (t) {
            if (t.idCommandOne == commandOneId && t.idCommandTwo == commandTwoId)
                result = t.commandOneGoals + " -- " + t.commandTwoGoals;
            if (t.idCommandOne == commandTwoId && t.idCommandTwo == commandOneId)
                result = t.commandTwoGoals + " -- " + t.commandOneGoals;
        }); }); });
        return result;
    };
    PastTournaments.prototype.getTable = function (positionCommand, groupTourNumber) {
        var self = this;
        var commandSize = positionCommand.length;
        var rowSize = new Array();
        var colSize = new Array();
        var table = new Array(commandSize + 1);
        for (var i = 0; i < commandSize + 1; i++) {
            rowSize.push(i);
            table[i] = new Array(commandSize + 3);
        }
        for (var i = 0; i < commandSize + 3; i++)
            colSize.push(i);
        for (var row = 0; row < table.length; row++) {
            for (var col = 0; col < table[row].length; col++) {
                if (row != 0 && col != 0 && row != col && col < commandSize + 1)
                    table[row][col] = self.getResult(positionCommand, groupTourNumber, row, col);
                if (row != 0 && col == commandSize + 1)
                    table[row][col] = positionCommand[row - 1].points;
                if (row != 0 && col == commandSize + 2)
                    table[row][col] = positionCommand[row - 1].place;
                if (row == 0 && col < commandSize + 1 && row != col)
                    table[row][col] = positionCommand[col - 1].commandName;
                if (col == 0 && row < commandSize + 1 && row != col)
                    table[row][col] = positionCommand[row - 1].commandName;
                if (row == 0 && col == commandSize + 1)
                    table[row][col] = "Очки";
                if (row == 0 && col == commandSize + 2)
                    table[row][col] = "Место";
            }
        }
        return new turnament_2.Table(rowSize, colSize, table);
    };
    PastTournaments = __decorate([
        core_1.Component({
            selector: 'past-tournaments',
            templateUrl: './past-tournaments.html'
        }),
        __metadata("design:paramtypes", [ng2_toastr_1.ToastsManager,
            core_1.ViewContainerRef,
            page_1.PageService,
            turnament_1.TurnamentService])
    ], PastTournaments);
    return PastTournaments;
}());
exports.PastTournaments = PastTournaments;
//# sourceMappingURL=past-tournaments.js.map