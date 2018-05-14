import { Component, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';

import { Common } from '../../../model/user/common';
import { TurnamentAdminService } from '../../../services/admin/turnament';
import { ElementRequest } from '../../../classes/admin/requests/ElementRequest';
import { SaveTurnamentInfoRequest, TurnamentStepRequest, DeclareRequest, RemoveDeclareRequest } from '../../../classes/admin/requests/turnamentRequest';
import { GetTurnament, GameTurnament, DayGame } from '../../../model/admin/turnament';

@Component({
    selector: 'tuning-turnament',
    templateUrl: './tuning-turnament.html'
})

export class TuningTurnament implements OnInit {
    public busy: Promise<any>;
    public id: string;
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
    public turnament: GetTurnament = new GetTurnament(null, null, null, null, null, null, null, null, null, null, null, null, null)

    public myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'dd.mm.yyyy'
    };

    constructor(
        private toastr: ToastsManager,
        private router: Router,
        private turnamentService: TurnamentAdminService,
        private route: ActivatedRoute) {
        var self = this;

        route.queryParams.subscribe(
            params => {
                self.id = params["key"];
            });

        self.getTurnament(self.id);
    }

    ngOnInit(): void {
    }

    public getTurnament(id) {
        var self = this;
        self.busy = self.turnamentService.GetTurnament(new ElementRequest(id)).then(response => {
            self.turnament = response.turnament;
            self.page = self.turnament.step > 1 ? 2 : 1;
            self.isCalc = self.turnament.positionCommand.length == 0 ? true : false;
            self.getTable();
        });
    }

    public getResult(row, col) {
        var self = this;

        var commandOneId = self.turnament.positionCommand[row - 1].commandId;
        var commandTwoId = self.turnament.positionCommand[col - 1].commandId;
        var result = "";
        self.turnament.groupTourNumber.forEach(gt => gt.groupDateStart.forEach(gd => gd.gameTurnament.forEach(t => {
            if (t.idCommandOne == commandOneId && t.idCommandTwo == commandTwoId)
                result = t.commandOneGoals + " -- " + t.commandTwoGoals;

            if (t.idCommandOne == commandTwoId && t.idCommandTwo == commandOneId)
                result = t.commandTwoGoals + " -- " + t.commandOneGoals;
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

        self.busy = self.turnamentService.SaveTurnamentInfo(new SaveTurnamentInfoRequest(self.turnament)).then(response => {
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

    public completeRegistration() {
        var self = this;

        self.busy = self.turnamentService.ChangeStep(new TurnamentStepRequest(self.turnament.id, 2)).then(response => {
            self.turnament.step = 2;
            self.page = 2;
            self.toastr.success("Этап построения");
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

        self.days = new Array<DayGame>();

        for (let i = 0; i < day; i++) {
            self.days.push(new DayGame(null));
        }
    }

    public divideForDay(tour) {
        var self = this;

        self.days.forEach(x => {
            if (x.day == null) {
                self.toastr.error("Не все даты звполнены");
                return;
            }
        })

        //self.busy = self.turnamentService.CalculateTable(new ElementRequest(self.turnament.id)).then(response => {
        //    self.getTurnament(self.id);
        //});
    }

    public selectDate(e) {
        var self = this;
        console.dir(e);
    }
    
} 
