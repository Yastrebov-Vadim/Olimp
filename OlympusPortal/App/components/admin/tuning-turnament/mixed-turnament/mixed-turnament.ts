import { Component, OnInit, Input } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router } from '@angular/router';

import { Common } from '../../../../model/user/common';
import { TurnamentAdminService } from '../../../../services/admin/turnament';
import { ElementRequest } from '../../../../classes/admin/requests/elementRequest';
import { GetMixedTurnament, GameTurnament, Arena, DayGame, Goal } from '../../../../model/admin/turnament';
import { Table } from '../../../../model/user/turnament';
import { SaveMixedTurnamentInfoRequest, CalculateGroupRequest, TurnamentStepRequest, DeclareRequest, RemoveDeclareRequest, DivideForDayRequest, ChangeGameDayRequest, TourStepRequest, CompleteGameRequest } from '../../../../classes/admin/requests/turnamentRequest';


@Component({
    selector: 'mixed-turnament',
    templateUrl: './mixed-turnament.html'
})

export class MixedTurnament implements OnInit {
    @Input() id: number;
    @Input() type: number;
    public busy: Promise<any>;
    public page: number = 1;
    public days: DayGame[] = new Array<DayGame>();
    public isCalc: boolean = false;
    public isPlOf: boolean = false;
    public countGroup: number = 0;
    public arens: Arena[] = new Array<Arena>();
    public turnament: GetMixedTurnament = new GetMixedTurnament(null, null, null, null, null, null, null, null, null, null, null, null, null, null)

    constructor(
        private toastr: ToastsManager,
        private router: Router,
        private turnamentService: TurnamentAdminService) {
    }

    ngOnInit(): void {
        var self = this;
        self.getTurnament(self.id);
        self.getArena();
    }

    public getTurnament(id) {
        var self = this;
        self.busy = self.turnamentService.GetTurnamentMixed(new ElementRequest(id)).then(response => {
            self.turnament = response.turnament;
            self.page = self.turnament.turnamentPlayOff.length == 0 ? self.turnament.step > 1 ? 2 : 1 : 3;
            self.turnament.turnamentGroups.forEach(x => {
                x.tableTutnament = self.getTable(x.positionCommand, x.groupTourNumber);
            });
            self.isPlOf = self.turnament.turnamentPlayOff.length == 0 ? true : false;
            self.isCalc = self.turnament.turnamentGroups.length == 0 ? true : false;
        });
    }

    public getArena() {
        var self = this;
        self.busy = self.turnamentService.GetArena().then(response => {
            self.arens = response.arens;
        });
    }

    public getResult(positionCommand, groupTourNumber, row, col) {
        var self = this;

        var commandOneId = positionCommand[row - 1].commandId;
        var commandTwoId = positionCommand[col - 1].commandId;
        var result = "";

        groupTourNumber.forEach(gt => gt.groupDateStart.forEach(gd => gd.gameTurnament.forEach(t => {
            if (t.idCommandOne == commandOneId && t.idCommandTwo == commandTwoId)
                result = t.commandOneGoals + " -- " + t.commandTwoGoals;

            if (t.idCommandOne == commandTwoId && t.idCommandTwo == commandOneId)
                result = t.commandTwoGoals + " -- " + t.commandOneGoals;
        })));

        return result;
    }

    public getTable(positionCommand, groupTourNumber) {
        var self = this;

        var commandSize = positionCommand.length;

        var rowSize = new Array<number>();
        var colSize = new Array<number>();

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

        return new Table(rowSize, colSize, table);
    }

    public back() {
        var self = this;

        self.router.navigate([Common.RoutePaths.Admin + Common.RoutePaths.Slash + Common.RoutePaths.Turnament], {});
    }

    public saveTurnament() {
        var self = this;

        self.busy = self.turnamentService.SaveMixedTurnamentInfo(new SaveMixedTurnamentInfoRequest(self.turnament)).then(response => {
            self.toastr.success("Сохранено");
        });
    }

    public acceptDeclare(turnamentId, commandId, index) {
        var self = this;

        self.busy = self.turnamentService.AcceptDeclare(new DeclareRequest(turnamentId, commandId)).then(response => {
            self.turnament.commands[index].status = true;
            self.toastr.success("Заявка принята");
        });
    }

    public completeRegistration() {
        var self = this;

        self.busy = self.turnamentService.ChangeStep(new TurnamentStepRequest(self.turnament.id, 2)).then(response => {
            self.turnament.step = 2;
            self.page = 2;
            self.toastr.success("Этап построения");
        });
    }

    public calculateGroup() {
        var self = this;

        if (self.countGroup <= 0) {
            self.toastr.error("Ошибка: колличество групп меньше или равно 0");
            return;
        }

        self.busy = self.turnamentService.CalculateGroup(new CalculateGroupRequest(self.turnament.id, self.countGroup)).then(response => {
            self.getTurnament(self.id);
            self.toastr.success("Турнирная табляца построена");
        });
    }

    public startTurnament() {
        var self = this;

        self.busy = self.turnamentService.ChangeStep(new TurnamentStepRequest(self.turnament.id, 3)).then(response => {
            self.turnament.step = 3;
            self.toastr.success("Этап в процессе");
        });
    }

    public changeStep(step) {
        var self = this;

        self.busy = self.turnamentService.ChangeStep(new TurnamentStepRequest(self.turnament.id, step)).then(response => {
            self.turnament.step = step;
            self.page = step > 1 ? 2 : 1;
            self.toastr.success("Смена этапа");
        });
    }

    public openRegistration() {
        var self = this;

        self.busy = self.turnamentService.ChangeStep(new TurnamentStepRequest(self.turnament.id, 1)).then(response => {
            self.turnament.step = 1;
            self.toastr.success("Этап регистрации");
        });
    }

    public changeDate(id: string, newDate: Date, date: Date, tour: number) {
        var self = this;
        var nowDate = date == null ? null : date;
        self.busy = self.turnamentService.ChangeDate(new ChangeGameDayRequest(id, nowDate, newDate, null, tour)).then(response => {
            self.toastr.success("Сохранено");
        });
    }

    public changeArena(id, arena: string, date: Date, tour: number) {
        var self = this;

        self.busy = self.turnamentService.ChangeArena(new ChangeGameDayRequest(id, date, null, arena, tour)).then(response => {
            self.toastr.success("Сохранено");
        });
    }

    public selectDay(index, day) {
        var self = this;

        if (day > self.turnament.turnamentGroups[index].positionCommand.length / 2) {
            self.toastr.error("Колличество дней не может превышать - " + Math.floor(self.turnament.turnamentGroups[index].positionCommand.length / 2));
            return;
        }

        if (day < 1) {
            self.toastr.error("Колличество дней не может быть меньше 1 дня");
            return;
        }

        self.days = new Array<DayGame>();

        for (let i = 0; i < day; i++) {
            self.days.push(new DayGame(null, null));
        }
    }

    public selectDayPlayOff(circle, index, day) {
        var self = this;
        var countGame = 0;
        self.turnament.turnamentPlayOff[circle].groupTourNumber[index].groupDateStart.forEach(x => {
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

        self.days = new Array<DayGame>();

        for (let i = 0; i < day; i++) {
            self.days.push(new DayGame(null, null));
        }
    }

    public divideForDay(index: number, tour: number) {
        var self = this;
        if (self.days.length == 0) {
            self.toastr.error("Не выбрана дата");
            return;
        }

        var isValid = true;

        if (self.days.length > 0)
            self.days.forEach(x => {
                if (x.day == null || x.arena == null) {
                    self.toastr.error("Не все поля заполнены");
                    isValid = false;
                    return;
                }
            })
        if (isValid)
            self.busy = self.turnamentService.DivideForDay(new DivideForDayRequest(self.turnament.turnamentGroups[index].groupId, tour, self.days)).then(response => {
                self.days = new Array<DayGame>();
                self.getTurnament(self.id);
                self.toastr.success("Игры распределены по дням");
            });
    }

    public divideForDayPlayOff(tour: number, circle: number) {
        var self = this;
        if (self.days.length == 0) {
            self.toastr.error("Не выбрана дата");
            return;
        }

        var isValid = true;

        if (self.days.length > 0)
            self.days.forEach(x => {
                if (x.day == null || x.arena == null) {
                    self.toastr.error("Не все поля заполнены");
                    isValid = false;
                    return;
                }
            })
        if (isValid)
            self.busy = self.turnamentService.DivideForDay(new DivideForDayRequest(self.turnament.turnamentPlayOff[circle].playOffId, tour, self.days)).then(response => {
                self.days = new Array<DayGame>();
                self.getTurnament(self.id);
                self.toastr.success("Игры распределены по дням");
            });
    }

    public activTour(tour, index) {
        var self = this;

        self.busy = self.turnamentService.ChangeStatusTour(new TourStepRequest(self.turnament.turnamentGroups[index].groupId, null, self.turnament.type, tour, 1)).then(response => {
            self.turnament.turnamentGroups[index].groupTourNumber[tour - 1].status = 1;
            self.turnament.turnamentGroups[index].groupTourNumber[tour - 1].groupDateStart.forEach(x => x.gameTurnament.forEach(y => y.status = 1));
            self.toastr.success("Тур активен");
        });
    }

    public activTourPlayOff(tour, index, circle) {
        var self = this;

        self.busy = self.turnamentService.ChangeStatusTour(new TourStepRequest(self.turnament.turnamentPlayOff[circle].playOffId, null, 3, tour, 1)).then(response => {
            self.turnament.turnamentPlayOff[circle].groupTourNumber[index].status = 1;
            self.turnament.turnamentPlayOff[circle].groupTourNumber[index].groupDateStart.forEach(x => x.gameTurnament.forEach(y => y.status = 1));
            self.toastr.success("Тур активен");
        });
    }

    public completeGame(id, index, oneGols, twoGols) {
        var self = this;

        if (oneGols < 0 || twoGols < 0) {
            self.toastr.error("Отрицательное колличество забитых мячей");
            return;
        }

        self.busy = self.turnamentService.CompleteGame(new CompleteGameRequest(self.turnament.turnamentGroups[index].groupId, id, oneGols, twoGols)).then(response => {
            self.getTurnament(self.id);
            self.toastr.success("Игра завершена");
        });
    }

    public completeGamePlayOff(id, index, circle, oneGols, twoGols) {
        var self = this;

        if (oneGols < 0 || twoGols < 0) {
            self.toastr.error("Отрицательное колличество забитых мячей");
            return;
        }

        self.busy = self.turnamentService.CompleteGame(new CompleteGameRequest(self.turnament.turnamentPlayOff[circle].playOffId, id, oneGols, twoGols)).then(response => {
            self.getTurnament(self.id);
            self.toastr.success("Игра завершена");
        });
    }

    public closeTour(tour, index) {
        var self = this;

        self.busy = self.turnamentService.CloseTour(new TourStepRequest(self.turnament.turnamentGroups[index].groupId, null, self.turnament.type, tour, null)).then(response => {
            self.getTurnament(self.id);
            self.toastr.success("Тур завершен");
        });
    }

    public closeTourPlayOff(id) {
        var self = this;

        self.busy = self.turnamentService.CloseTour(new TourStepRequest(self.turnament.id, id, 3, null, null)).then(response => {
            self.getTurnament(self.id);
            self.toastr.success("Тур завершен");
        });
    }

    public calculatePlayOff() {
        var self = this;

        self.busy = self.turnamentService.CalculatePlayOff(new ElementRequest(self.turnament.id)).then(response => {
            self.getTurnament(self.id);
            self.toastr.success("Турнирная табляца построена");
        });
    }

    public completeTurnament() {
        var self = this;

        self.changeStep(4);
        self.toastr.success("Турнир завершен");
    }

    public addGoal(id) {
        var self = this;
        self.turnament.turnamentGroups.forEach(g => g.groupTourNumber.forEach(g => g.groupDateStart.forEach(d => d.gameTurnament.forEach(x => {
           // if (x.id == id)
              //  x.goals.push(new Goal(null, null, null));
        }))));
    }
} 
