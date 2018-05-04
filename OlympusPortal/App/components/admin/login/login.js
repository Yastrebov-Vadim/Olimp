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
var authentication_1 = require("../../../services/admin/authentication");
var common_1 = require("../../../model/user/common");
var login_1 = require("../../../model/admin/login");
var authorizationRequest_1 = require("../../../classes/user/requests/authorizationRequest");
var Login = (function () {
    function Login(toastr, pageService, router, http, authenticationService) {
        this.toastr = toastr;
        this.pageService = pageService;
        this.router = router;
        this.http = http;
        this.authenticationService = authenticationService;
        this.loginAdmin = new login_1.LoginAdmin(null, null);
        var self = this;
    }
    Login.prototype.ngOnInit = function () {
        var self = this;
        self.pageService.recipeSelected.emit(7);
        self.pageService.recipeSelected.subscribe(function (page) {
            self.page = page;
        });
        self.isAuth();
    };
    Login.prototype.isAuth = function () {
        var self = this;
        self.authenticationService.IsAuth().then(function (response) {
            self.isAuthAdmin = response.isAuth;
            if (!self.isAuthAdmin)
                self.router.navigate([common_1.Common.RoutePaths.Admin], { queryParams: {} });
            else
                self.router.navigate([common_1.Common.RoutePaths.Admin + common_1.Common.RoutePaths.Slash + common_1.Common.RoutePaths.News], { queryParams: {} });
        });
    };
    Login.prototype.signIn = function (isPass) {
        var self = this;
        var self = this;
        if (isPass) {
            self.toastr.error("Минимальная длинна пароля 6 символов");
            return;
        }
        if (self.loginAdmin.login == null || self.loginAdmin.password == null || self.loginAdmin.login == "" || self.loginAdmin.password == "") {
            self.toastr.error("Все поля должны быть заполнены");
            return;
        }
        self.busy = self.authenticationService.SignInAdmin(new authorizationRequest_1.AuthorizationRequest(self.loginAdmin.login, self.loginAdmin.password)).then(function (response) {
            self.isAuthAdmin = true;
            self.router.navigate([common_1.Common.RoutePaths.Admin + common_1.Common.RoutePaths.Slash + common_1.Common.RoutePaths.News], { queryParams: {} });
            self.toastr.info("Добро пожаловть!", response);
        });
    };
    Login.prototype.signOutAdmin = function () {
        var self = this;
        self.busy = self.authenticationService.SignOutAdmin().then(function (response) {
            self.toastr.info("До свидания!");
            self.isAuthAdmin = false;
            self.router.navigate([common_1.Common.RoutePaths.Admin], { queryParams: {} });
        });
    };
    Login = __decorate([
        core_1.Component({
            selector: 'login',
            templateUrl: './login.html'
        }),
        __metadata("design:paramtypes", [ng2_toastr_1.ToastsManager,
            page_1.PageService,
            router_1.Router,
            http_1.Http,
            authentication_1.AuthenticationAdminService])
    ], Login);
    return Login;
}());
exports.Login = Login;
//# sourceMappingURL=login.js.map