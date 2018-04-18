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
var authentication_1 = require("./services/authentication");
var authorizationRequest_1 = require("./classes/requests/authorizationRequest");
var emailRequest_1 = require("./classes/requests/emailRequest");
var page_1 = require("./services/page");
var email_1 = require("./services/email");
var common_1 = require("./model/common");
var user_1 = require("./model/user");
var App = (function () {
    function App(toastr, vcr, authenticationService, pageService, emailService, router) {
        this.toastr = toastr;
        this.vcr = vcr;
        this.authenticationService = authenticationService;
        this.pageService = pageService;
        this.emailService = emailService;
        this.router = router;
        this.ex = true;
        this.selectPage = 1;
        this.isValid = false;
        this.isCode = false;
        this.user = new user_1.UserRegistration(null, null, null, null, null, null);
        this.toastr.setRootViewContainerRef(vcr);
    }
    App.prototype.ngOnInit = function () {
        var self = this;
        document.getElementById("g-loader").style.display = 'none';
        self.getAccount();
        self.user.email = "Olimp-Portal@yandex.ru";
        self.pageService.recipeSelected.subscribe(function (page) {
            self.page = page;
        });
    };
    App.prototype.getAccount = function () {
        var self = this;
        self.busy = self.authenticationService.GetAccount().then(function (response) {
            self.name = response.login;
            self.isAuth = response.isAuth;
        });
    };
    App.prototype.exit = function () {
        var self = this;
        self.busy = self.authenticationService.Exit().then(function (response) {
            self.toastr.info("До свидания!", self.name);
            self.isAuth = false;
            self.router.navigate([common_1.Common.RoutePaths.Home], { queryParams: {} });
        });
    };
    App.prototype.isExit = function () {
        var self = this;
        var buttom = document.getElementById("exit2");
        var cabinet = document.getElementById("cabinet");
        if (self.ex) {
            buttom.style.marginLeft = document.getElementById("exit1").clientWidth - 30 + "px";
            cabinet.style.marginLeft = (30 - cabinet.clientWidth) + "px";
        }
        else {
            buttom.style.marginLeft = "0px";
            cabinet.style.marginLeft = "0px";
        }
        self.ex = !self.ex;
    };
    App.prototype.userPage = function (page) {
        var self = this;
        self.selectPage = page;
        self.user.password = null;
        self.passwordTo = null;
    };
    App.prototype.authorization = function () {
        var self = this;
        if (self.user.login == null || self.user.password == null || self.user.login == "" || self.user.password == "") {
            self.toastr.error("Все поля должны быть заполнены");
            return;
        }
        self.busy = self.authenticationService.Authorization(new authorizationRequest_1.AuthorizationRequest(self.user.login, self.user.password)).then(function (response) {
            self.close();
            self.isValid = false;
            self.name = response;
            self.isAuth = true;
            self.toastr.info("Добро пожаловть!", response);
        });
    };
    App.prototype.registratioBlockStyle = function () {
        var self = this;
        var top = (window.outerHeight - 500) / 2;
        return {
            "margin-top": top + "px"
        };
    };
    App.prototype.goCome = function () {
        var self = this;
        self.userPage(1);
        document.getElementById("transparent-layer").style.display = "block";
    };
    App.prototype.close = function () {
        document.getElementById("transparent-layer").style.display = "none";
    };
    App.prototype.singCodeToEmail = function () {
        var self = this;
        if (self.user.email == null || self.user.email.length == 0) {
            self.toastr.error("Не заполнен адресс электронной почты");
            return;
        }
        self.busy = self.emailService.singCodeToEmail(new emailRequest_1.SingCodeToEmailRequest(self.user.email, null)).then(function (response) {
            self.toastr.success("Код подтверждения отправлен на почтовый адрес");
        });
    };
    App.prototype.registration = function (isValid, isCode) {
        var self = this;
        if (isValid) {
            self.toastr.error("Все поля должны быть заполнены");
            return;
        }
        if (!isCode) {
            self.toastr.error("Ведите код подтверждения");
            return;
        }
        self.busy = self.authenticationService.registration(self.user)
            .then(function (response) {
            self.toastr.success("Регистрация прошла успешно");
            self.router.navigate([common_1.Common.RoutePaths.Cabinet], { queryParams: {} });
            self.close();
            self.getAccount();
        })
            .catch(function (response) {
            self.user.code = null;
        });
    };
    App.prototype.goCabinet = function () {
        var self = this;
        document.getElementById("exit2").style.marginLeft = "0px";
        document.getElementById("cabinet").style.marginLeft = "0px";
        self.router.navigate([common_1.Common.RoutePaths.Cabinet], { queryParams: {} });
    };
    App.prototype.confirmTheCode = function () {
        var self = this;
        if (self.user.code == null || self.user.code.toString().length == 0) {
            self.toastr.error("Не заполнен код подтверждения");
            return;
        }
        self.busy = self.authenticationService.confirmTheCode(self.user)
            .then(function (response) {
            self.isCode = true;
            self.toastr.success("Код подтвержден");
        })
            .catch(function (response) {
            self.user.code = null;
        });
    };
    App.prototype.singCodeToEmailReplace = function (isValid) {
        var self = this;
        if (isValid) {
            self.toastr.error("Не все поля заполнены");
            return;
        }
        self.busy = self.emailService.singCodeToEmail(new emailRequest_1.SingCodeToEmailRequest(self.user.email, self.user.login)).then(function (response) {
            self.toastr.success("Код подтверждения отправлен на почтовый адрес");
        });
    };
    App.prototype.replacePassvord = function () {
        var self = this;
        if (self.user.password == null || self.user.password.length == 0 && self.user.password != self.passwordTo) {
            self.toastr.error("Некоректный пароль");
            return;
        }
        self.busy = self.authenticationService.replacePassvord(self.user).then(function (response) {
            self.toastr.success("Пароль изменен");
            self.userPage(1);
        });
    };
    App = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './app.html',
            providers: [page_1.PageService]
        }),
        __metadata("design:paramtypes", [ng2_toastr_1.ToastsManager,
            core_1.ViewContainerRef,
            authentication_1.AuthenticationService,
            page_1.PageService,
            email_1.EmailService,
            router_1.Router])
    ], App);
    return App;
}());
exports.App = App;
//# sourceMappingURL=app.js.map