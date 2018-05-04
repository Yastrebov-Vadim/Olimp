import { Component, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router } from '@angular/router';
import { Http, RequestOptions } from '@angular/http';

import { PageService } from '../../../services/page';
import { AuthenticationAdminService } from '../../../services/admin/authentication';
import { Common } from '../../../model/user/common';

import { LoginAdmin } from '../../../model/admin/login';
import { AuthorizationRequest } from '../../../classes/user/requests/authorizationRequest';

@Component({
    selector: 'login',
    templateUrl: './login.html'
})
export class Login implements OnInit {
    public busy: Promise<any>;
    public loginAdmin: LoginAdmin = new LoginAdmin(null, null);
    public isAuthAdmin: boolean;
    public page: number;

    constructor(
        private toastr: ToastsManager,
        private pageService: PageService,
        private router: Router,
        public http: Http,
        private authenticationService: AuthenticationAdminService) {
        var self = this;
    }

    ngOnInit(): void {
        var self = this;
        self.pageService.recipeSelected.emit(7);

        self.pageService.recipeSelected.subscribe(
            (page: number) => {
                self.page = page;
            }
        );

        self.isAuth();
    }

    public isAuth() {
        var self = this;
        self.authenticationService.IsAuth().then(response => {
            self.isAuthAdmin = response.isAuth;
            if (!self.isAuthAdmin)
                self.router.navigate([Common.RoutePaths.Admin], { queryParams: {} });
            else
                self.router.navigate([Common.RoutePaths.Admin + Common.RoutePaths.Slash + Common.RoutePaths.News], { queryParams: {} });
        });
    }

    public signIn(isPass) {
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

        self.busy = self.authenticationService.SignInAdmin(new AuthorizationRequest(self.loginAdmin.login, self.loginAdmin.password)).then(response => {
            self.isAuthAdmin = true;
            self.router.navigate([Common.RoutePaths.Admin + Common.RoutePaths.Slash + Common.RoutePaths.News], { queryParams: {} });
            self.toastr.info("Добро пожаловть!", response);
        });
    }

    public signOutAdmin() {
        var self = this;

        self.busy = self.authenticationService.SignOutAdmin().then(response => {
            self.toastr.info("До свидания!");
            self.isAuthAdmin = false;
            self.router.navigate([Common.RoutePaths.Admin], { queryParams: {} });
        });
    }
}
