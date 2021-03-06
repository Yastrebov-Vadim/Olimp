﻿import { Component, OnInit, Input } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router } from '@angular/router';

import { Common } from '../../../../model/user/common';
import { TurnamentAdminService } from '../../../../services/admin/turnament';
import { ElementRequest } from '../../../../classes/admin/requests/elementRequest';
import { SaveCircleTurnamentInfoRequest, AddCardRequest, TurnamentStepRequest, DeclareRequest, AddGoalRequest, RemoveDeclareRequest, DivideForDayRequest, ChangeGameDayRequest, TourStepRequest, CompleteGameRequest } from '../../../../classes/admin/requests/turnamentRequest';
import { GetCircleTurnament, GameTurnament, DayGame, Arena, Goal, Card, Player, Command } from '../../../../model/admin/turnament';

@Component({
    selector: 'circle-turnament',
    templateUrl: './circle-turnament.html'
})

export class CircleTurnament implements OnInit {
    @Input() id: string;
    @Input() type: number;
    public busy: Promise<any>;
    public dateStart: any;
    public page: number = 1;
    public cause: string = null;
    public commandId: string = null;
    public index: number = null;
    public isCalc: boolean = false;
    public rowSize: number[] = new Array<number>();
    public colSize: number[] = new Array<number>();
    public days: DayGame[] = new Array<DayGame>();
    public table = new Array();
    public players: Player[] = new Array<Player>();
    public goal: Goal = new Goal(null, null, null, null, null, null, null);
    public card: Card = new Card(null, null, null, null, null, null, null);
    public isYellowe: boolean;
    public isRed: boolean;
    public arens: Arena[] = new Array<Arena>();
    public commands: Command[] = new Array<Command>();
    public turnament: GetCircleTurnament = new GetCircleTurnament(null, null, null, null, null, null, null, null, null, null, null, null, null)

    constructor(
        private toastr: ToastsManager,
        private router: Router,
        private turnamentService: TurnamentAdminService) {
    }

    ngOnInit(): void {
        var self = this;
        self.getTurnament(self.id);
        self.getPlayerForTurnament(self.id);
        self.getArena();
    }

    public getTurnament(id) {
        var self = this;
        self.busy = self.turnamentService.GetTurnamentCircle(new ElementRequest(id)).then(response => {
            self.turnament = response.turnament;
            self.page = self.turnament.step > 1 ? 2 : 1;
            self.isCalc = self.turnament.positionCommand.length == 0 ? true : false;
            self.getTable();
        });
    }

    public getPlayerForTurnament(id) {
        var self = this;
        self.busy = self.turnamentService.GetPlayerForTurnament(new ElementRequest(id)).then(response => {
            self.players = response.players;
        });
    }

    public getArena() {
        var self = this;
        self.busy = self.turnamentService.GetArena().then(response => {
            self.arens = response.arens;
        });
    }

    public getResult(row, col) {
        var self = this;

        var commandOneId = self.turnament.positionCommand[row - 1].commandId;
        var commandTwoId = self.turnament.positionCommand[col - 1].commandId;
        var result = "";
        self.turnament.groupTourNumber.forEach(gt => gt.groupDateStart.forEach(gd => gd.gameTurnament.forEach(t => {
            if (t.idCommandOne == commandOneId && t.idCommandTwo == commandTwoId) {
                var oneGoals = t.commandOneGoals.value == null ? "-" : t.commandOneGoals.value;
                var twoGoals = t.commandTwoGoals.value == null ? "-" : t.commandTwoGoals.value;
                result = oneGoals + " : " + twoGoals;
            }

            if (t.idCommandOne == commandTwoId && t.idCommandTwo == commandOneId) {
                var oneGoals = t.commandOneGoals.value == null ? "-" : t.commandOneGoals.value;
                var twoGoals = t.commandTwoGoals.value == null ? "-" : t.commandTwoGoals.value;
                result = twoGoals + " : " + oneGoals;
            }
        })));

        return result;
    }

    public getTable() {
        var self = this;

        var commandSize = self.turnament.positionCommand.length;

        self.rowSize = new Array<number>();
        self.colSize = new Array<number>();

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
    }

    public back() {
        var self = this;

        self.router.navigate([Common.RoutePaths.Admin + Common.RoutePaths.Slash + Common.RoutePaths.Turnament], {});
    }

    public saveTurnament() {
        var self = this;

        self.busy = self.turnamentService.SaveCircleTurnamentInfo(new SaveCircleTurnamentInfoRequest(self.turnament)).then(response => {
            self.toastr.success("Сохранено");
        });
    }

    public openRegistration() {
        var self = this;

        self.busy = self.turnamentService.ChangeStep(new TurnamentStepRequest(self.turnament.id, 1)).then(response => {
            self.turnament.step = 1;
            self.toastr.success("Этап регистрации");
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

    public changeArena(arena: string, date: Date, tour: number) {
        var self = this;

        self.busy = self.turnamentService.ChangeArena(new ChangeGameDayRequest(self.turnament.id, date, null, arena, tour)).then(response => {
            self.toastr.success("Сохранено");
        });
    }

    public changeDate(newDate: Date, date: Date, tour: number) {
        var self = this;
        var nowDate = date == null ? null : date;
        self.busy = self.turnamentService.ChangeDate(new ChangeGameDayRequest(self.turnament.id, nowDate, newDate, null, tour)).then(response => {
            self.toastr.success("Сохранено");
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

    public startTurnament() {
        var self = this;

        self.busy = self.turnamentService.ChangeStep(new TurnamentStepRequest(self.turnament.id, 3)).then(response => {
            self.turnament.step = 3;
            self.toastr.success("Этап в процессе");
        });
    }

    public acceptDeclare(turnamentId, commandId, index) {
        var self = this;

        self.busy = self.turnamentService.AcceptDeclare(new DeclareRequest(turnamentId, commandId)).then(response => {
            self.turnament.commands[index].status = true;
            self.toastr.success("Заявка принята");
        });
    }

    public selectDeclare(commandId, index) {
        var self = this;

        self.commandId = commandId;
        self.index = index;
    }

    public removeDeclare() {
        var self = this;

        if (self.commandId == null && self.index == null)
            return;

        if (self.cause == null || self.cause == "") {
            self.toastr.error("Укажите причину отказа");
            return;
        }

        self.busy = self.turnamentService.RemoveDeclare(new RemoveDeclareRequest(self.turnament.id, self.commandId, self.cause)).then(response => {
            self.turnament.commands.splice(self.index, 1);
            self.commandId = null;
            self.index = null;
            self.cause = null;
            self.toastr.success("Заявка отклонена");
        });
    }

    public calculateTable() {
        var self = this;

        self.busy = self.turnamentService.CalculateTable(new ElementRequest(self.turnament.id)).then(response => {
            self.getTurnament(self.id);
            self.toastr.success("Турнирная табляца построена");
        });
    }

    public selectDay(day) {
        var self = this;

        if (day > self.turnament.positionCommand.length / 2) {
            self.toastr.error("Колличество дней не может превышать - " + self.turnament.positionCommand.length / 2);
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

    public divideForDay(tour: number) {
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
            self.busy = self.turnamentService.DivideForDay(new DivideForDayRequest(self.turnament.id, tour, self.days)).then(response => {
                self.days = new Array<DayGame>();
                self.getTurnament(self.id);
                self.toastr.success("Игры распределены по дням");
            });
    }

    public activTour(tour) {
        var self = this;

        self.busy = self.turnamentService.ChangeStatusTour(new TourStepRequest(self.turnament.id, null, self.turnament.type, tour, 1)).then(response => {
            self.turnament.groupTourNumber[tour - 1].status = 1;
            self.turnament.groupTourNumber[tour - 1].groupDateStart.forEach(x => x.gameTurnament.forEach(y => y.status = 1));
            self.toastr.success("Тур активен");
        });
    }

    public completeGame(id, oneGols, twoGols) {
        var self = this;

        if (oneGols < 0 || twoGols < 0) {
            self.toastr.error("Отрицательное колличество забитых мячей");
            return;
        }

        self.busy = self.turnamentService.CompleteGame(new CompleteGameRequest(self.turnament.id, id, oneGols, twoGols)).then(response => {
            self.getTurnament(self.id);
            self.toastr.success("Игра завершена");
        });
    }

    public closeTour(tour) {
        var self = this;

        self.busy = self.turnamentService.CloseTour(new TourStepRequest(self.turnament.id, null, self.turnament.type, tour, null)).then(response => {
            self.getTurnament(self.id);
            self.toastr.success("Тур завершен");
        });
    }

    public completeTurnament() {
        var self = this;

        self.changeStep(4);
        self.toastr.success("Турнир завершен");
    }

    public openFormAddGoals() {
        var self = this;

        document.getElementById("transparent-layer-goals").style.display = "block";
    }

    public openFormAddCard() {
        var self = this;

        document.getElementById("transparent-layer-card").style.display = "block";
    }

    public close() {
        document.getElementById("transparent-layer-goals").style.display = "none";
        document.getElementById("transparent-layer-card").style.display = "none";
    }

    public addGoalsBlockStyle() {
        var self = this;
        var top = (window.outerHeight - 500) / 2;

        return {
            "margin-top": top + "px"
        }
    }

    public addGoals(isValid) {
        var self = this;

        if (isValid) {
            self.toastr.error("Все поля должны быть заполнены");
            return;
        }

        self.goal.turnamentId = self.id;

        self.busy = self.turnamentService.AddGoals(new AddGoalRequest(self.goal)).then(response => {
            self.getTurnament(self.id);
            self.goal = new Goal(null, null, null, null, null, null, null);
            self.close();
            self.toastr.success("Гол добавлен в систему");
        });
    }

    public addCard(isValid) {
        var self = this;

        if (isValid || (!self.isYellowe && !self.isRed)) {
            self.toastr.error("Все поля должны быть заполнены");
            return;
        }

        self.card.turnamentId = self.id;

        self.card.type = self.isYellowe ? 1 : 2;

        self.busy = self.turnamentService.AddCard(new AddCardRequest(self.card)).then(response => {
            self.getTurnament(self.id);
            self.goal = new Goal(null, null, null, null, null, null, null);
            self.close();
            self.toastr.success("Штраф добавлен в систему");
        });
    }
    
    public selectCommand(game: GameTurnament) {
        var self = this;

        self.commands = new Array<Command>();
        self.commandId = null;
        self.commands.push(new Command(game.idCommandOne, game.commandOneName));
        self.commands.push(new Command(game.idCommandTwo, game.commandTwoName));
        self.goal.gameId = game.id;
        self.card.gameId = game.id;
    }

    public getPlayer() {
        var self = this;
        if (self.commandId != null)
            return self.players.filter(x => x.commandId == self.commandId)

        return new Array<Player>();
    }
} 