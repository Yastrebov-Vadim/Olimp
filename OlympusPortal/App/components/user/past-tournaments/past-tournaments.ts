import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { PageService } from '../../../services/page';
import { TurnamentService } from '../../../services/user/turnament';
import { GetTurnamentForUser } from '../../../model/user/turnament';
import { Table } from '../../../model/user/turnament';
import { ElementTypeRequest } from '../../../classes/user/requests/elementTypeRequest';

@Component({
    selector: 'past-tournaments',
    templateUrl: './past-tournaments.html'
})
export class PastTournaments implements OnInit {
    public busy: Promise<any>;
    public turnaments: GetTurnamentForUser[];
    public isTur: boolean = false;
    public page: number = 2;

    constructor(
        private toastr: ToastsManager,
        private vcr: ViewContainerRef,
        private pageService: PageService,
        private turnamentService: TurnamentService) {

    }

    ngOnInit(): void {
        var self = this;
        self.pageService.recipeSelected.emit(2);
        self.getTournaments();
    }

    public getTournaments() {
        var self = this;
        self.busy = self.turnamentService.GetTurnaments(new ElementTypeRequest(4)).then(response => {
            self.turnaments = response.turnaments;
            self.turnaments.forEach(x => {
                if (x.type == 1) {
                    x.tableTutnament = self.getTable(x.positionCommand, x.groupTourNumber);
                }
                else {
                    x.turnamentGroups.forEach(g => {
                        g.tableTutnament = self.getTable(g.positionCommand, g.groupTourNumber);
                    });
                }
            });
            self.isTur = self.turnaments.length > 0;
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
}
