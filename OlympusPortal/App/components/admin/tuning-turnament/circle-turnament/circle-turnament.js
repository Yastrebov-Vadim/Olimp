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
var common_1 = require("../../../../model/user/common");
var turnament_1 = require("../../../../services/admin/turnament");
var elementRequest_1 = require("../../../../classes/admin/requests/elementRequest");
var turnamentRequest_1 = require("../../../../classes/admin/requests/turnamentRequest");
var turnament_2 = require("../../../../model/admin/turnament");
var CircleTurnament = (function () {
    function CircleTurnament(toastr, router, turnamentService) {
        this.toastr = toastr;
        this.router = router;
        this.turnamentService = turnamentService;
        this.page = 1;
        this.cause = null;
        this.commandId = null;
        this.index = null;
        this.isCalc = false;
        this.rowSize = new Array();
        this.colSize = new Array();
        this.days = new Array();
        this.table = new Array();
        this.arens = new Array();
        this.turnament = new turnament_2.GetCircleTurnament(null, null, null, null, null, null, null, null, null, null, null, null, null);
    }
    CircleTurnament.prototype.ngOnInit = function () {
        var self = this;
        self.getTurnament(self.id);
        self.getArena();
    };
    CircleTurnament.prototype.getTurnament = function (id) {
        var self = this;
        self.busy = self.turnamentService.GetTurnamentCircle(new elementRequest_1.ElementRequest(id)).then(function (response) {
            self.turnament = response.turnament;
            self.page = self.turnament.step > 1 ? 2 : 1;
            self.isCalc = self.turnament.positionCommand.length == 0 ? true : false;
            self.getTable();
        });
    };
    CircleTurnament.prototype.getArena = function () {
        var self = this;
        self.busy = self.turnamentService.GetArena().then(function (response) {
            self.arens = response.arens;
        });
    };
    CircleTurnament.prototype.getResult = function (row, col) {
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
    CircleTurnament.prototype.getTable = function () {
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
    CircleTurnament.prototype.back = function () {
        var self = this;
        self.router.navigate([common_1.Common.RoutePaths.Admin + common_1.Common.RoutePaths.Slash + common_1.Common.RoutePaths.Turnament], {});
    };
    CircleTurnament.prototype.saveTurnament = function () {
        var self = this;
        self.busy = self.turnamentService.SaveCircleTurnamentInfo(new turnamentRequest_1.SaveCircleTurnamentInfoRequest(self.turnament)).then(function (response) {
            self.toastr.success("Сохранено");
        });
    };
    CircleTurnament.prototype.openRegistration = function () {
        var self = this;
        self.busy = self.turnamentService.ChangeStep(new turnamentRequest_1.TurnamentStepRequest(self.turnament.id, 1)).then(function (response) {
            self.turnament.step = 1;
            self.toastr.success("Этап регистрации");
        });
    };
    CircleTurnament.prototype.changeStep = function (step) {
        var self = this;
        self.busy = self.turnamentService.ChangeStep(new turnamentRequest_1.TurnamentStepRequest(self.turnament.id, step)).then(function (response) {
            self.turnament.step = step;
            self.page = step > 1 ? 2 : 1;
            self.toastr.success("Смена этапа");
        });
    };
    CircleTurnament.prototype.changeArena = function (arena, date, tour) {
        var self = this;
        self.busy = self.turnamentService.ChangeArena(new turnamentRequest_1.ChangeGameDayRequest(self.turnament.id, date, null, arena, tour)).then(function (response) {
            self.toastr.success("Сохранено");
        });
    };
    CircleTurnament.prototype.changeDate = function (newDate, date, tour) {
        var self = this;
        var nowDate = date == null ? null : date;
        self.busy = self.turnamentService.ChangeDate(new turnamentRequest_1.ChangeGameDayRequest(self.turnament.id, nowDate, newDate, null, tour)).then(function (response) {
            self.toastr.success("Сохранено");
        });
    };
    CircleTurnament.prototype.completeRegistration = function () {
        var self = this;
        self.busy = self.turnamentService.ChangeStep(new turnamentRequest_1.TurnamentStepRequest(self.turnament.id, 2)).then(function (response) {
            self.turnament.step = 2;
            self.page = 2;
            self.toastr.success("Этап построения");
        });
    };
    CircleTurnament.prototype.startTurnament = function () {
        var self = this;
        self.busy = self.turnamentService.ChangeStep(new turnamentRequest_1.TurnamentStepRequest(self.turnament.id, 3)).then(function (response) {
            self.turnament.step = 3;
            self.toastr.success("Этап в процессе");
        });
    };
    CircleTurnament.prototype.acceptDeclare = function (turnamentId, commandId, index) {
        var self = this;
        self.busy = self.turnamentService.AcceptDeclare(new turnamentRequest_1.DeclareRequest(turnamentId, commandId)).then(function (response) {
            self.turnament.commands[index].status = true;
            self.toastr.success("Заявка принята");
        });
    };
    CircleTurnament.prototype.selectDeclare = function (commandId, index) {
        var self = this;
        self.commandId = commandId;
        self.index = index;
    };
    CircleTurnament.prototype.removeDeclare = function () {
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
    CircleTurnament.prototype.calculateTable = function () {
        var self = this;
        self.busy = self.turnamentService.CalculateTable(new elementRequest_1.ElementRequest(self.turnament.id)).then(function (response) {
            self.getTurnament(self.id);
            self.toastr.success("Турнирная табляца построена");
        });
    };
    CircleTurnament.prototype.selectDay = function (day) {
        var self = this;
        if (day > self.turnament.positionCommand.length / 2) {
            self.toastr.error("Колличество дней не может превышать - " + self.turnament.positionCommand.length / 2);
            return;
        }
        if (day < 1) {
            self.toastr.error("Колличество дней не может быть меньше 1 дня");
            return;
        }
        self.days = new Array();
        for (var i = 0; i < day; i++) {
            self.days.push(new turnament_2.DayGame(null, null));
        }
    };
    CircleTurnament.prototype.divideForDay = function (tour) {
        var self = this;
        if (self.days.length == 0) {
            self.toastr.error("Не выбрана дата");
            return;
        }
        var isValid = true;
        if (self.days.length > 0)
            self.days.forEach(function (x) {
                if (x.day == null || x.arena == null) {
                    self.toastr.error("Не все поля заполнены");
                    isValid = false;
                    return;
                }
            });
        if (isValid)
            self.busy = self.turnamentService.DivideForDay(new turnamentRequest_1.DivideForDayRequest(self.turnament.id, tour, self.days)).then(function (response) {
                self.days = new Array();
                self.getTurnament(self.id);
                self.toastr.success("Игры распределены по дням");
            });
    };
    CircleTurnament.prototype.activTour = function (tour) {
        var self = this;
        self.busy = self.turnamentService.ChangeStatusTour(new turnamentRequest_1.TourStepRequest(self.turnament.id, self.turnament.type, tour, 1)).then(function (response) {
            self.turnament.groupTourNumber[tour - 1].status = 1;
            self.turnament.groupTourNumber[tour - 1].groupDateStart.forEach(function (x) { return x.gameTurnament.forEach(function (y) { return y.status = 1; }); });
            self.toastr.success("Тур активен");
        });
    };
    CircleTurnament.prototype.completeGame = function (id, oneGols, twoGols) {
        var self = this;
        if (oneGols < 0 || twoGols < 0) {
            self.toastr.error("Отрицательное колличество забитых мячей");
            return;
        }
        self.busy = self.turnamentService.CompleteGame(new turnamentRequest_1.CompleteGameRequest(self.turnament.id, id, oneGols, twoGols)).then(function (response) {
            self.getTurnament(self.id);
            self.toastr.success("Игра завершена");
        });
    };
    CircleTurnament.prototype.closeTour = function (tour) {
        var self = this;
        self.busy = self.turnamentService.CloseTour(new turnamentRequest_1.TourStepRequest(self.turnament.id, self.turnament.type, tour, null)).then(function (response) {
            self.getTurnament(self.id);
            self.toastr.success("Тур завершен");
        });
    };
    CircleTurnament.prototype.completeTurnament = function () {
        var self = this;
        self.changeStep(4);
        self.toastr.success("Тур завершен");
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], CircleTurnament.prototype, "id", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], CircleTurnament.prototype, "type", void 0);
    CircleTurnament = __decorate([
        core_1.Component({
            selector: 'circle-turnament',
            templateUrl: './circle-turnament.html'
        }),
        __metadata("design:paramtypes", [ng2_toastr_1.ToastsManager,
            router_1.Router,
            turnament_1.TurnamentAdminService])
    ], CircleTurnament);
    return CircleTurnament;
}());
exports.CircleTurnament = CircleTurnament;
//# sourceMappingURL=circle-turnament.js.map