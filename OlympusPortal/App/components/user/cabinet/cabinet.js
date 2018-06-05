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
var http_1 = require("@angular/http");
var page_1 = require("../../../services/page");
var account_1 = require("../../../services/user/account");
var authentication_1 = require("../../../services/user/authentication");
var image_1 = require("../../../services/user/image");
var account_2 = require("../../../model/user/account");
var common_1 = require("../../../model/user/common");
var elementtRequest_1 = require("../../../classes/user/requests/elementtRequest");
var turnament_1 = require("../../../services/user/turnament");
var turnament_2 = require("../../../model/user/turnament");
var Cabinet = (function () {
    function Cabinet(toastr, pageService, accountService, imgService, authenticationService, router, http, turnamentService) {
        this.toastr = toastr;
        this.pageService = pageService;
        this.accountService = accountService;
        this.imgService = imgService;
        this.authenticationService = authenticationService;
        this.router = router;
        this.http = http;
        this.turnamentService = turnamentService;
        this.isEdit = true;
        this.idPlayer = null;
        this.index = null;
        this.page = 1;
        this.list = 2;
        this.isTur = false;
        var self = this;
        self.account = new account_2.Account(null, null, null, null, null);
        self.chengeAccount = new account_2.Account(null, null, null, null, null);
        self.player = new account_2.Player(null, null, null, null, null);
        self.chengePlayer = new Array();
    }
    Cabinet.prototype.ngOnInit = function () {
        var self = this;
        self.pageService.recipeSelected.emit(0);
        self.getAccount();
        self.isAccount();
        self.getTournaments();
    };
    Cabinet.prototype.getTournaments = function () {
        var self = this;
        self.busy = self.turnamentService.GetTurnamentsForUser().then(function (response) {
            self.turnaments = response.turnaments;
            self.turnaments.forEach(function (x) {
                if (x.type == 1) {
                    x.tableTutnament = self.getTable(x.positionCommand, x.groupTourNumber);
                }
                else {
                    x.turnamentGroups.forEach(function (g) {
                        g.tableTutnament = self.getTable(g.positionCommand, g.groupTourNumber);
                    });
                    x.isOlayOff = x.turnamentPlayOff.length != 0;
                }
            });
            self.isTur = self.turnaments.length > 0;
        });
    };
    Cabinet.prototype.getResult = function (positionCommand, groupTourNumber, row, col) {
        var self = this;
        var commandOneId = positionCommand[row - 1].commandId;
        var commandTwoId = positionCommand[col - 1].commandId;
        var result = "";
        groupTourNumber.forEach(function (gt) { return gt.groupDateStart.forEach(function (gd) { return gd.gameTurnament.forEach(function (t) {
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
        }); }); });
        return result;
    };
    Cabinet.prototype.getTable = function (positionCommand, groupTourNumber) {
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
    Cabinet.prototype.isAccount = function () {
        var self = this;
        self.busy = self.authenticationService.GetAccount().then(function (response) {
            if (!response.isAuth)
                self.router.navigate([common_1.Common.RoutePaths.Home], { queryParams: {} });
        });
    };
    Cabinet.prototype.getAccount = function () {
        var self = this;
        self.busy = self.accountService.GetAccount().then(function (response) {
            self.account = response;
        });
    };
    Cabinet.prototype.openFormAddPlayer = function () {
        var self = this;
        document.getElementById("transparent-layer-player").style.display = "block";
    };
    Cabinet.prototype.close = function () {
        document.getElementById("transparent-layer-player").style.display = "none";
    };
    Cabinet.prototype.addPlayerBlockStyle = function () {
        var self = this;
        var top = (window.outerHeight - 500) / 2;
        return {
            "margin-top": top + "px"
        };
    };
    Cabinet.prototype.addPlayer = function (isValid, isPattern) {
        var self = this;
        if (isValid) {
            if (isPattern) {
                self.toastr.error("Номер игрока должен быть числом");
                return;
            }
            self.toastr.error("Все поля должны быть заполнены");
            return;
        }
        self.busy = self.accountService.AddPlayer(self.player).then(function (response) {
            self.player.playerId = response.txt;
            self.account.command.push(self.player);
            self.close();
            self.player = new account_2.Player(null, null, null, null, null);
            self.sortPlayer();
            self.toastr.success("Игрок добавлен");
        });
    };
    Cabinet.prototype.selectPlayer = function (id, i) {
        var self = this;
        self.idPlayer = id;
        self.index = i;
    };
    Cabinet.prototype.dellPlayer = function () {
        var self = this;
        if (self.idPlayer == null && self.index == null)
            return;
        self.busy = self.accountService.DellPlayer(new elementtRequest_1.ElementRequest(self.idPlayer)).then(function (response) {
            self.account.command.splice(self.index, 1);
            self.idPlayer = null;
            self.index = null;
            self.toastr.success("Игрок удален");
        });
    };
    Cabinet.prototype.avatarChanged = function (e) {
        var self = this;
        var target = e.target;
        var img = target.files[0];
        var formData = new FormData();
        formData.append("image", img, img.name);
        self.busy = self.imgService.AddImageAvatar(formData).then(function (response) {
            self.account.photo = response.txt;
            self.toastr.success("Изображение загружено");
        });
    };
    Cabinet.prototype.editAccountInfo = function (isEdit) {
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
        self.busy = self.accountService.EditAccountInfo(self.chengeAccount).then(function (response) {
            self.chengePlayer = new Array();
            document.getElementById("exit1").innerText = self.account.name;
            self.sortPlayer();
            self.toastr.success("Сохранено");
        });
    };
    Cabinet.prototype.changeInfoPlayer = function (player, isPattern) {
        var self = this;
        if (isPattern) {
            self.toastr.error("Номер должен быть числом");
            return;
        }
        self.chengePlayer.push(player);
    };
    Cabinet.prototype.sortPlayer = function () {
        var self = this;
        self.account.command.sort(function (a, b) { return a.number <= b.number ? -1 : 1; });
    };
    Cabinet = __decorate([
        core_1.Component({
            selector: 'cabinet',
            templateUrl: './cabinet.html'
        }),
        __metadata("design:paramtypes", [ng2_toastr_1.ToastsManager,
            page_1.PageService,
            account_1.AccountService,
            image_1.ImageService,
            authentication_1.AuthenticationService,
            router_1.Router,
            http_1.Http,
            turnament_1.TurnamentService])
    ], Cabinet);
    return Cabinet;
}());
exports.Cabinet = Cabinet;
//# sourceMappingURL=cabinet.js.map