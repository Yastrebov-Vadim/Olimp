import { Component, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router } from '@angular/router';
import { Http, RequestOptions } from '@angular/http';

import { PageService } from '../../../services/page';
import { AccountService } from '../../../services/user/account';
import { AuthenticationService } from '../../../services/user/authentication';
import { ImageService } from '../../../services/user/image';

import { Account, Player } from '../../../model/user/account';
import { Common } from '../../../model/user/common';
import { ElementRequest } from '../../../classes/user/requests/elementtRequest';
import { Observable } from 'rxjs/Observable';
import { TurnamentService } from '../../../services/user/turnament';
import { GetTurnamentForUser } from '../../../model/user/turnament';
import { Table } from '../../../model/user/turnament';

@Component({
    selector: 'cabinet',
    templateUrl: './cabinet.html'
})
export class Cabinet implements OnInit {
    apiEndPoint: any;
    public busy: Promise<any>;
    public account: Account;
    public chengeAccount: Account;
    public chengePlayer: Player[];
    public player: Player;
    public isEdit: boolean = true;
    public idPlayer: string = null;
    public index: number = null;
    public page: number = 1;
    public list: number = 2;
    public isTur: boolean = false;
    public turnaments: GetTurnamentForUser[];

    constructor(
        private toastr: ToastsManager,
        private pageService: PageService,
        private accountService: AccountService,
        private imgService: ImageService,
        private authenticationService: AuthenticationService,
        private router: Router,
        public http: Http,
        private turnamentService: TurnamentService) {
        var self = this;
        self.account = new Account(null, null, null, null, null);
        self.chengeAccount = new Account(null, null, null, null, null);
        self.player = new Player(null, null, null, null, null);
        self.chengePlayer = new Array<Player>();
    }

    ngOnInit(): void {
        var self = this;
        self.pageService.recipeSelected.emit(0);
        self.getAccount();
        self.isAccount();
        self.getTournaments();
    }

    public getTournaments() {
        var self = this;
        self.busy = self.turnamentService.GetTurnamentsForUser().then(response => {
            self.turnaments = response.turnaments;
            self.turnaments.forEach(x => {
                if (x.type == 1) {
                    x.tableTutnament = self.getTable(x.positionCommand, x.groupTourNumber);
                }
                else {
                    x.turnamentGroups.forEach(g => {
                        g.tableTutnament = self.getTable(g.positionCommand, g.groupTourNumber);
                    });
                    x.isOlayOff = x.turnamentPlayOff.length != 0;
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
            if (t.idCommandOne == commandOneId && t.idCommandTwo == commandTwoId) {
                var oneGoals = t.commandOneGoals.value == null ? "-" : t.commandOneGoals.value;
                var twoGoals = t.commandTwoGoals.value == null ? "-" : t.commandTwoGoals.value;
                result = oneGoals + " : " + twoGoals;
            }

            if (t.idCommandOne == commandTwoId && t.idCommandTwo == commandOneId) {
                var oneGoals = t.commandTwoGoals.value == null ? "-" : t.commandTwoGoals.value;
                var twoGoals = t.commandOneGoals.value == null ? "-" : t.commandOneGoals.value;
                result = twoGoals + " : " + oneGoals;
            }
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

    public isAccount() {
        var self = this;
        self.busy = self.authenticationService.GetAccount().then(response => {
            if (!response.isAuth)
                self.router.navigate([Common.RoutePaths.Home], { queryParams: {} });
        });
    }

    public getAccount() {
        var self = this;
        self.busy = self.accountService.GetAccount().then(response => {
            self.account = response;
        });
    }

    public openFormAddPlayer() {
        var self = this;

        document.getElementById("transparent-layer-player").style.display = "block";
    }

    public close() {
        document.getElementById("transparent-layer-player").style.display = "none";
    }

    public addPlayerBlockStyle() {
        var self = this;
        var top = (window.outerHeight - 500) / 2;

        return {
            "margin-top": top + "px"
        }
    }

    public addPlayer(isValid, isPattern) {
        var self = this;

        if (isValid) {
            if (isPattern) {
                self.toastr.error("Номер игрока должен быть числом");
                return;
            }

            self.toastr.error("Все поля должны быть заполнены");
            return;
        }
        
        self.busy = self.accountService.AddPlayer(self.player).then(response => {
            self.player.playerId = response.txt;
            self.account.command.push(self.player);
            self.close();
            self.player = new Player(null, null, null, null, null);
            self.sortPlayer();
            self.toastr.success("Игрок добавлен");
        });
    }

    public selectPlayer(id, i) {
        var self = this;

        self.idPlayer = id;
        self.index = i;
    }

    public dellPlayer() {
        var self = this;

        if (self.idPlayer == null && self.index == null)
            return;

        self.busy = self.accountService.DellPlayer(new ElementRequest(self.idPlayer)).then(response => {
            self.account.command.splice(self.index, 1);
            self.idPlayer = null;
            self.index = null;
            self.toastr.success("Игрок удален");
        });
    }

    public avatarChanged(e: Event) {
        var self = this;

        var target: HTMLInputElement = e.target as HTMLInputElement;

        var img = target.files[0];
        var formData: FormData = new FormData();
        formData.append("image", img, img.name);

        self.busy = self.imgService.AddImageAvatar(formData).then(response => {
            self.account.photo = response.txt;
            self.toastr.success("Изображение загружено");
        });
    }

    public editAccountInfo(isEdit) {
        var self = this;

        self.isEdit = !isEdit;

        if (isEdit) {
            document.getElementById("editButton").innerText = "Сохранить";
            return;
        }

        document.getElementById("editButton").innerText = "Редактировать";


        self.chengeAccount.name = self.account.name;
        self.chengeAccount.phone = self.account.phone;
        self.chengeAccount.email = self.account.email;
        self.chengeAccount.command = self.chengePlayer;

        self.busy = self.accountService.EditAccountInfo(self.chengeAccount).then(response => {
            self.chengePlayer = new Array<Player>();
            document.getElementById("exit1").innerText = self.account.name;
            self.sortPlayer();
            self.toastr.success("Сохранено");
        });
    }

    public changeInfoPlayer(player, isPattern) {
        var self = this;

        if (isPattern) {
            self.toastr.error("Номер должен быть числом");
            return;
        }

        self.chengePlayer.push(player);
    }

    public sortPlayer() {
        var self = this;

        self.account.command.sort((a, b) => a.number <= b.number ? -1 : 1);
    }
}
