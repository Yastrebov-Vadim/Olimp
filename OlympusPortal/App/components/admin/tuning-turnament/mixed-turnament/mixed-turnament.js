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
var turnament_2 = require("../../../../model/admin/turnament");
var turnament_3 = require("../../../../model/user/turnament");
var turnamentRequest_1 = require("../../../../classes/admin/requests/turnamentRequest");
var MixedTurnament = (function () {
    function MixedTurnament(toastr, router, turnamentService) {
        this.toastr = toastr;
        this.router = router;
        this.turnamentService = turnamentService;
        this.page = 1;
        this.days = new Array();
        this.isCalc = false;
        this.isPlOf = false;
        this.countGroup = 0;
        this.arens = new Array();
        this.turnament = new turnament_2.GetMixedTurnament(null, null, null, null, null, null, null, null, null, null, null, null, null, null);
    }
    MixedTurnament.prototype.ngOnInit = function () {
        var self = this;
        self.getTurnament(self.id);
        self.getArena();
    };
    MixedTurnament.prototype.getTurnament = function (id) {
        var self = this;
        self.busy = self.turnamentService.GetTurnamentMixed(new elementRequest_1.ElementRequest(id)).then(function (response) {
            self.turnament = response.turnament;
            self.page = self.turnament.turnamentPlayOff.length == 0 ? self.turnament.step > 1 ? 2 : 1 : 3;
            self.turnament.turnamentGroups.forEach(function (x) {
                x.tableTutnament = self.getTable(x.positionCommand, x.groupTourNumber);
            });
            self.isPlOf = self.turnament.turnamentPlayOff.length == 0 ? true : false;
            self.isCalc = self.turnament.turnamentGroups.length == 0 ? true : false;
        });
    };
    MixedTurnament.prototype.getArena = function () {
        var self = this;
        self.busy = self.turnamentService.GetArena().then(function (response) {
            self.arens = response.arens;
        });
    };
    MixedTurnament.prototype.getResult = function (positionCommand, groupTourNumber, row, col) {
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
    MixedTurnament.prototype.getTable = function (positionCommand, groupTourNumber) {
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
        return new turnament_3.Table(rowSize, colSize, table);
    };
    MixedTurnament.prototype.back = function () {
        var self = this;
        self.router.navigate([common_1.Common.RoutePaths.Admin + common_1.Common.RoutePaths.Slash + common_1.Common.RoutePaths.Turnament], {});
    };
    MixedTurnament.prototype.saveTurnament = function () {
        var self = this;
        self.busy = self.turnamentService.SaveMixedTurnamentInfo(new turnamentRequest_1.SaveMixedTurnamentInfoRequest(self.turnament)).then(function (response) {
            self.toastr.success("Сохранено");
        });
    };
    MixedTurnament.prototype.acceptDeclare = function (turnamentId, commandId, index) {
        var self = this;
        self.busy = self.turnamentService.AcceptDeclare(new turnamentRequest_1.DeclareRequest(turnamentId, commandId)).then(function (response) {
            self.turnament.commands[index].status = true;
            self.toastr.success("Заявка принята");
        });
    };
    MixedTurnament.prototype.completeRegistration = function () {
        var self = this;
        self.busy = self.turnamentService.ChangeStep(new turnamentRequest_1.TurnamentStepRequest(self.turnament.id, 2)).then(function (response) {
            self.turnament.step = 2;
            self.page = 2;
            self.toastr.success("Этап построения");
        });
    };
    MixedTurnament.prototype.calculateGroup = function () {
        var self = this;
        if (self.countGroup <= 0) {
            self.toastr.error("Ошибка: колличество групп меньше или равно 0");
            return;
        }
        self.busy = self.turnamentService.CalculateGroup(new turnamentRequest_1.CalculateGroupRequest(self.turnament.id, self.countGroup)).then(function (response) {
            self.getTurnament(self.id);
            self.toastr.success("Турнирная табляца построена");
        });
    };
    MixedTurnament.prototype.startTurnament = function () {
        var self = this;
        self.busy = self.turnamentService.ChangeStep(new turnamentRequest_1.TurnamentStepRequest(self.turnament.id, 3)).then(function (response) {
            self.turnament.step = 3;
            self.toastr.success("Этап в процессе");
        });
    };
    MixedTurnament.prototype.changeStep = function (step) {
        var self = this;
        self.busy = self.turnamentService.ChangeStep(new turnamentRequest_1.TurnamentStepRequest(self.turnament.id, step)).then(function (response) {
            self.turnament.step = step;
            self.page = step > 1 ? 2 : 1;
            self.toastr.success("Смена этапа");
        });
    };
    MixedTurnament.prototype.openRegistration = function () {
        var self = this;
        self.busy = self.turnamentService.ChangeStep(new turnamentRequest_1.TurnamentStepRequest(self.turnament.id, 1)).then(function (response) {
            self.turnament.step = 1;
            self.toastr.success("Этап регистрации");
        });
    };
    MixedTurnament.prototype.changeDate = function (id, newDate, date, tour) {
        var self = this;
        var nowDate = date == null ? null : date;
        self.busy = self.turnamentService.ChangeDate(new turnamentRequest_1.ChangeGameDayRequest(id, nowDate, newDate, null, tour)).then(function (response) {
            self.toastr.success("Сохранено");
        });
    };
    MixedTurnament.prototype.changeArena = function (id, arena, date, tour) {
        var self = this;
        self.busy = self.turnamentService.ChangeArena(new turnamentRequest_1.ChangeGameDayRequest(id, date, null, arena, tour)).then(function (response) {
            self.toastr.success("Сохранено");
        });
    };
    MixedTurnament.prototype.selectDay = function (index, day) {
        var self = this;
        if (day > self.turnament.turnamentGroups[index].positionCommand.length / 2) {
            self.toastr.error("Колличество дней не может превышать - " + Math.floor(self.turnament.turnamentGroups[index].positionCommand.length / 2));
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
    MixedTurnament.prototype.selectDayPlayOff = function (circle, index, day) {
        var self = this;
        var countGame = 0;
        self.turnament.turnamentPlayOff[circle].groupTourNumber[index].groupDateStart.forEach(function (x) {
            countGame += x.gameTurnament.length;
        });
        if (day > countGame) {
            self.toastr.error("Колличество дней не может превышать - " + countGame);
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
    MixedTurnament.prototype.divideForDay = function (index, tour) {
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
            self.busy = self.turnamentService.DivideForDay(new turnamentRequest_1.DivideForDayRequest(self.turnament.turnamentGroups[index].groupId, tour, self.days)).then(function (response) {
                self.days = new Array();
                self.getTurnament(self.id);
                self.toastr.success("Игры распределены по дням");
            });
    };
    MixedTurnament.prototype.divideForDayPlayOff = function (tour, circle) {
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
            self.busy = self.turnamentService.DivideForDay(new turnamentRequest_1.DivideForDayRequest(self.turnament.turnamentPlayOff[circle].playOffId, tour, self.days)).then(function (response) {
                self.days = new Array();
                self.getTurnament(self.id);
                self.toastr.success("Игры распределены по дням");
            });
    };
    MixedTurnament.prototype.activTour = function (tour, index) {
        var self = this;
        self.busy = self.turnamentService.ChangeStatusTour(new turnamentRequest_1.TourStepRequest(self.turnament.turnamentGroups[index].groupId, null, self.turnament.type, tour, 1)).then(function (response) {
            self.turnament.turnamentGroups[index].groupTourNumber[tour - 1].status = 1;
            self.turnament.turnamentGroups[index].groupTourNumber[tour - 1].groupDateStart.forEach(function (x) { return x.gameTurnament.forEach(function (y) { return y.status = 1; }); });
            self.toastr.success("Тур активен");
        });
    };
    MixedTurnament.prototype.activTourPlayOff = function (tour, index, circle) {
        var self = this;
        self.busy = self.turnamentService.ChangeStatusTour(new turnamentRequest_1.TourStepRequest(self.turnament.turnamentPlayOff[circle].playOffId, null, 3, tour, 1)).then(function (response) {
            self.turnament.turnamentPlayOff[circle].groupTourNumber[index].status = 1;
            self.turnament.turnamentPlayOff[circle].groupTourNumber[index].groupDateStart.forEach(function (x) { return x.gameTurnament.forEach(function (y) { return y.status = 1; }); });
            self.toastr.success("Тур активен");
        });
    };
    MixedTurnament.prototype.completeGame = function (id, index, oneGols, twoGols) {
        var self = this;
        if (oneGols < 0 || twoGols < 0) {
            self.toastr.error("Отрицательное колличество забитых мячей");
            return;
        }
        self.busy = self.turnamentService.CompleteGame(new turnamentRequest_1.CompleteGameRequest(self.turnament.turnamentGroups[index].groupId, id, oneGols, twoGols)).then(function (response) {
            self.getTurnament(self.id);
            self.toastr.success("Игра завершена");
        });
    };
    MixedTurnament.prototype.completeGamePlayOff = function (id, index, circle, oneGols, twoGols) {
        var self = this;
        if (oneGols < 0 || twoGols < 0) {
            self.toastr.error("Отрицательное колличество забитых мячей");
            return;
        }
        self.busy = self.turnamentService.CompleteGame(new turnamentRequest_1.CompleteGameRequest(self.turnament.turnamentPlayOff[circle].playOffId, id, oneGols, twoGols)).then(function (response) {
            self.getTurnament(self.id);
            self.toastr.success("Игра завершена");
        });
    };
    MixedTurnament.prototype.closeTour = function (tour, index) {
        var self = this;
        self.busy = self.turnamentService.CloseTour(new turnamentRequest_1.TourStepRequest(self.turnament.turnamentGroups[index].groupId, null, self.turnament.type, tour, null)).then(function (response) {
            self.getTurnament(self.id);
            self.toastr.success("Тур завершен");
        });
    };
    MixedTurnament.prototype.closeTourPlayOff = function (id) {
        var self = this;
        self.busy = self.turnamentService.CloseTour(new turnamentRequest_1.TourStepRequest(self.turnament.id, id, 3, null, null)).then(function (response) {
            self.getTurnament(self.id);
            self.toastr.success("Тур завершен");
        });
    };
    MixedTurnament.prototype.calculatePlayOff = function () {
        var self = this;
        self.busy = self.turnamentService.CalculatePlayOff(new elementRequest_1.ElementRequest(self.turnament.id)).then(function (response) {
            self.getTurnament(self.id);
            self.toastr.success("Турнирная табляца построена");
        });
    };
    MixedTurnament.prototype.completeTurnament = function () {
        var self = this;
        self.changeStep(4);
        self.toastr.success("Турнир завершен");
    };
    MixedTurnament.prototype.addGoal = function (id) {
        var self = this;
        self.turnament.turnamentGroups.forEach(function (g) { return g.groupTourNumber.forEach(function (g) { return g.groupDateStart.forEach(function (d) { return d.gameTurnament.forEach(function (x) {
        }); }); }); });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], MixedTurnament.prototype, "id", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], MixedTurnament.prototype, "type", void 0);
    MixedTurnament = __decorate([
        core_1.Component({
            selector: 'mixed-turnament',
            templateUrl: './mixed-turnament.html'
        }),
        __metadata("design:paramtypes", [ng2_toastr_1.ToastsManager,
            router_1.Router,
            turnament_1.TurnamentAdminService])
    ], MixedTurnament);
    return MixedTurnament;
}());
exports.MixedTurnament = MixedTurnament;
//# sourceMappingURL=mixed-turnament.js.map