import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from './services/user/authentication';
import { AuthorizationRequest } from './classes/user/requests/authorizationRequest';
import { SingCodeToEmailRequest } from './classes/user/requests/emailRequest';

import { PageService } from './services/page';
import { EmailService } from './services/user/email';
import { Common } from './model/user/common';

import { Account, UserAuthentication, UserRegistration } from './model/user/user';

@Component({
    selector: 'app-root',
    templateUrl: './app.html',
    providers: [PageService]
})

export class App implements OnInit {
    public busy: Promise<any>;
    public name: string;
    public isAuth: boolean;
    public ex: boolean = true;
    public page: number;
    public selectPage: number = 1;
    public isValid: boolean = false;
    public passwordTo: string;
    public isCode: boolean = false;

    public user: UserRegistration = new UserRegistration(null, null, null, null, null, null);

    constructor(private toastr: ToastsManager,
        private vcr: ViewContainerRef,
        private authenticationService: AuthenticationService,
        private pageService: PageService,
        private emailService: EmailService,
        private router: Router) {

        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
        var self = this;
        document.getElementById("g-loader").style.display = 'none';
        self.getAccount();

        self.user.email = "Olimp-Portal@yandex.ru";

        self.pageService.recipeSelected.subscribe(
            (page: number) => {
                self.page = page;
            }
        );
    }

    public getAccount() {
        var self = this;
        self.busy = self.authenticationService.GetAccount().then(response => {
            self.name = response.login;
            self.isAuth = response.isAuth;
        });
    }

    public signOutUser() {
        var self = this;

        self.busy = self.authenticationService.SignOutUser().then(response => {
            self.toastr.info("До свидания!", self.name);
            self.isAuth = false;
            self.router.navigate([Common.RoutePaths.Home], { queryParams: {} });
        });
    }

    public isExit() {
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
    }

    public userPage(page) {
        var self = this;
        self.selectPage = page;
        self.user.password = null;
        self.passwordTo = null;
    }

    public signInUser() {
        var self = this;
        if (self.user.login == null || self.user.password == null || self.user.login == "" || self.user.password == "") {
            self.toastr.error("Все поля должны быть заполнены");
            return;
        }

        self.busy = self.authenticationService.SignInUser(new AuthorizationRequest(self.user.login, self.user.password)).then(response => {
            self.close();
            self.isValid = false;
            self.name = response;
            self.isAuth = true;
            self.toastr.info("Добро пожаловть!", response);
        });
    }


    public registratioBlockStyle() {
        var self = this;
        var top = (window.outerHeight - 500) / 2;

        return {
            "margin-top": top + "px"
        }
    }

    public goCome() {
        var self = this;

        self.userPage(1);
        document.getElementById("transparent-layer").style.display = "block";
        self.ex = true;
    }

    public close() {
        document.getElementById("transparent-layer").style.display = "none";
    }

    public singCodeToEmail() {
        var self = this;
        if (self.user.email == null || self.user.email.length == 0) {
            self.toastr.error("Не заполнен адресс электронной почты");
            return;
        }

        self.busy = self.emailService.singCodeToEmail(new SingCodeToEmailRequest(self.user.email, null)).then(response => {
            self.toastr.success("Код подтверждения отправлен на почтовый адрес");
        });
    }

    public registration(isValid, isCode) {
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
            .then(response => {
                self.toastr.success("Регистрация прошла успешно");
                self.router.navigate([Common.RoutePaths.Cabinet], { queryParams: {} });
                self.close();
                self.getAccount();
            })
            .catch(response => {
                self.user.code = null;
            });
    }

    public goCabinet() {
        var self = this;
        document.getElementById("exit2").style.marginLeft = "0px";
        document.getElementById("cabinet").style.marginLeft = "0px";
        self.ex = true;
        self.router.navigate([Common.RoutePaths.Cabinet], { queryParams: {} });
    }

    public confirmTheCode() {
        var self = this;

        if (self.user.code == null || self.user.code.toString().length == 0) {
            self.toastr.error("Не заполнен код подтверждения");
            return;
        }

        self.busy = self.authenticationService.confirmTheCode(self.user)
            .then(response => {
                self.isCode = true;
                self.toastr.success("Код подтвержден");
            })
            .catch(response => {
                self.user.code = null;
            });
    }

    public singCodeToEmailReplace(isValid) {
        var self = this;
        if (isValid) {
            self.toastr.error("Не все поля заполнены");
            return;
        }

        self.busy = self.emailService.singCodeToEmail(new SingCodeToEmailRequest(self.user.email, self.user.login)).then(response => {
            self.toastr.success("Код подтверждения отправлен на почтовый адрес");
        });
    }


    public replacePassvord() {
        var self = this;
        if (self.user.password == null || self.user.password.length == 0 && self.user.password != self.passwordTo) {
            self.toastr.error("Некоректный пароль");
            return;
        }

        self.busy = self.authenticationService.replacePassvord(self.user).then(response => {
            self.toastr.success("Пароль изменен");
            self.userPage(1);
        });
    }

}