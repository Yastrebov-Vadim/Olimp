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
var common_1 = require("../../../model/user/common");
var turnament_1 = require("../../../services/admin/turnament");
var ElementRequest_1 = require("../../../classes/admin/requests/ElementRequest");
var turnamentRequest_1 = require("../../../classes/admin/requests/turnamentRequest");
var turnament_2 = require("../../../model/admin/turnament");
var TuningTurnament = (function () {
    function TuningTurnament(toastr, router, turnamentService, route) {
        this.toastr = toastr;
        this.router = router;
        this.turnamentService = turnamentService;
        this.route = route;
        this.page = 1;
        this.cause = null;
        this.commandId = null;
        this.index = null;
        this.isCalc = false;
        this.rowSize = new Array();
        this.colSize = new Array();
        this.days = new Array();
        this.table = new Array();
        this.turnament = new turnament_2.GetTurnament(null, null, null, null, null, null, null, null, null, null, null, null, null);
        this.myDatePickerOptions = {
            dateFormat: 'dd.mm.yyyy'
        };
        var self = this;
        route.queryParams.subscribe(function (params) {
            self.id = params["key"];
        });
        self.getTurnament(self.id);
    }
    TuningTurnament.prototype.ngOnInit = function () {
    };
    TuningTurnament.prototype.getTurnament = function (id) {
        var self = this;
        self.busy = self.turnamentService.GetTurnament(new ElementRequest_1.ElementRequest(id)).then(function (response) {
            self.turnament = response.turnament;
            self.page = self.turnament.step > 1 ? 2 : 1;
            self.isCalc = self.turnament.positionCommand.length == 0 ? true : false;
            self.getTable();
        });
    };
    TuningTurnament.prototype.getResult = function (row, col) {
        var self = this;
        var commandOneId = self.turnament.positionCommand[row - 1].commandId;
        var commandTwoId = self.turnament.positionCommand[col - 1].commandId;
        var result = "";
        self.turnament.groupTourNumber.forEach(function (gt) { return gt.groupDateStart.forEach(function (gd) { return gd.gameTurnament.forEach(function (t) {
            if (t.idCommandOne == commandOneId && t.idCommandTwo == commandTwoId)
                result = t.commandOneGoals + " -- " + t.commandTwoGoals;
            if (t.idCommandOne == commandTwoId && t.idCommandTwo == commandOneId)
                result = t.commandTwoGoals + " -- " + t.commandOneGoals;
        }); }); });
        return result;
    };
    TuningTurnament.prototype.getTable = function () {
        var self = this;
        var commandSize = self.turnament.positionCommand.length;
        self.rowSize = new Array();
        self.colSize = new Array();
        self.table = new Array(commandSize + 1);
        for (var i = 0; i < commandSize + 1; i++) {
            self.rowSize.push(i);
            self.table[i] = new Array(commandSize + 3);
        }
        for (var i = 0; i < commandSize + 3; i++)
            self.colSize.push(i);
        for (var row = 0; row < self.table.length; row++) {
            for (var col = 0; col < self.table[row].length; col++) {
                if (row != 0 && col != 0 && row != col && col < commandSize + 1)
                    self.table[row][col] = self.getResult(row, col);
                if (row != 0 && col == commandSize + 1)
                    self.table[row][col] = self.turnament.positionCommand[row - 1].points;
                if (row != 0 && col == commandSize + 2)
                    self.table[row][col] = self.turnament.positionCommand[row - 1].place;
                if (row == 0 && col < commandSize + 1 && row != col)
                    self.table[row][col] = self.turnament.positionCommand[col - 1].commandName;
                if (col == 0 && row < commandSize + 1 && row != col)
                    self.table[row][col] = self.turnament.positionCommand[row - 1].commandName;
                if (row == 0 && col == commandSize + 1)
                    self.table[row][col] = "Очки";
                if (row == 0 && col == commandSize + 2)
                    self.table[row][col] = "Место";
            }
        }
    };
    TuningTurnament.prototype.back = function () {
        var self = this;
        self.router.navigate([common_1.Common.RoutePaths.Admin + common_1.Common.RoutePaths.Slash + common_1.Common.RoutePaths.Turnament], {});
    };
    TuningTurnament.prototype.saveTurnament = function () {
        var self = this;
        self.busy = self.turnamentService.SaveTurnamentInfo(new turnamentRequest_1.SaveTurnamentInfoRequest(self.turnament)).then(function (response) {
            self.toastr.success("Сохранено");
        });
    };
    TuningTurnament.prototype.openRegistration = function () {
        var self = this;
        self.busy = self.turnamentService.ChangeStep(new turnamentRequest_1.TurnamentStepRequest(self.turnament.id, 1)).then(function (response) {
            self.turnament.step = 1;
            self.toastr.success("Этап регистрации");
        });
    };
    TuningTurnament.prototype.changeStep = function (step) {
        var self = this;
        self.busy = self.turnamentService.ChangeStep(new turnamentRequest_1.TurnamentStepRequest(self.turnament.id, step)).then(function (response) {
            self.turnament.step = step;
            self.page = step > 1 ? 2 : 1;
            self.toastr.success("Смена этапа");
        });
    };
    TuningTurnament.prototype.completeRegistration = function () {
        var self = this;
        self.busy = self.turnamentService.ChangeStep(new turnamentRequest_1.TurnamentStepRequest(self.turnament.id, 2)).then(function (response) {
            self.turnament.step = 2;
            self.page = 2;
            self.toastr.success("Этап построения");
        });
    };
    TuningTurnament.prototype.acceptDeclare = function (turnamentId, commandId, index) {
        var self = this;
        self.busy = self.turnamentService.AcceptDeclare(new turnamentRequest_1.DeclareRequest(turnamentId, commandId)).then(function (response) {
            self.turnament.commands[index].status = true;
            self.toastr.success("Заявка принята");
        });
    };
    TuningTurnament.prototype.selectDeclare = function (commandId, index) {
        var self = this;
        self.commandId = commandId;
        self.index = index;
    };
    TuningTurnament.prototype.removeDeclare = function () {
        var self = this;
        if (self.commandId == null && self.index == null)
            return;
        if (self.cause == null || self.cause == "") {
            self.toastr.error("Укажите причину отказа");
            return;
        }
        self.busy = self.turnamentService.RemoveDeclare(new turnamentRequest_1.RemoveDeclareRequest(self.turnament.id, self.commandId, self.cause)).then(function (response) {
            self.turnament.commands.splice(self.index, 1);
            self.commandId = null;
            self.index = null;
            self.cause = null;
            self.toastr.success("Заявка отклонена");
        });
    };
    TuningTurnament.prototype.calculateTable = function () {
        var self = this;
        self.busy = self.turnamentService.CalculateTable(new ElementRequest_1.ElementRequest(self.turnament.id)).then(function (response) {
            self.getTurnament(self.id);
            self.toastr.success("Турнирная табляца построена");
        });
    };
    TuningTurnament.prototype.selectDay = function (day) {
        var self = this;
        if (day > self.turnament.positionCommand.length / 2) {
            self.toastr.error("Колличество дней не может превышать - " + self.turnament.positionCommand.length / 2);
            return;
        }
        self.days = new Array();
        for (var i = 0; i < day; i++) {
            self.days.push(new Date());
        }
    };
    TuningTurnament.prototype.divideForDay = function (tour) {
        var self = this;
        console.dir(tour);
        var sd = self.days;
    };
    TuningTurnament = __decorate([
        core_1.Component({
            selector: 'tuning-turnament',
            templateUrl: './tuning-turnament.html'
        }),
        __metadata("design:paramtypes", [ng2_toastr_1.ToastsManager,
            router_1.Router,
            turnament_1.TurnamentAdminService,
            router_1.ActivatedRoute])
    ], TuningTurnament);
    return TuningTurnament;
}());
exports.TuningTurnament = TuningTurnament;
//# sourceMappingURL=tuning-turnament.js.map