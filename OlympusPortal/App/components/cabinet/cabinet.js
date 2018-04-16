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
var page_1 = require("../../services/page");
var account_1 = require("../../services/account");
var authentication_1 = require("../../services/authentication");
var image_1 = require("../../services/image");
var account_2 = require("../../model/account");
var common_1 = require("../../model/common");
var accountRequest_1 = require("../../classes/requests/accountRequest");
var Cabinet = (function () {
    function Cabinet(toastr, pageService, accountService, imgService, authenticationService, router, http) {
        this.toastr = toastr;
        this.pageService = pageService;
        this.accountService = accountService;
        this.imgService = imgService;
        this.authenticationService = authenticationService;
        this.router = router;
        this.http = http;
        this.isEdit = true;
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
                self.toastr.error("Номер должен быть числом");
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
    Cabinet.prototype.dellPlayer = function (id, i) {
        var self = this;
        self.busy = self.accountService.DellPlayer(new accountRequest_1.ElementRequest(id)).then(function (response) {
            self.account.command.splice(i, 1);
            self.toastr.success("Игрок удален");
        });
    };
    Cabinet.prototype.fileChanged = function (e) {
        var target = e.target;
        this.upload(target.files[0]);
    };
    Cabinet.prototype.upload = function (img) {
        var self = this;
        var formData = new FormData();
        formData.append("image", img, img.name);
        self.busy = self.imgService.GetImageAvatar(formData).then(function (response) {
            self.account.foto = response.txt;
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
            http_1.Http])
    ], Cabinet);
    return Cabinet;
}());
exports.Cabinet = Cabinet;
//# sourceMappingURL=cabinet.js.map