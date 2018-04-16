import { Component, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router } from '@angular/router';
import { Http, RequestOptions } from '@angular/http';

import { PageService } from '../../services/page';
import { AccountService } from '../../services/account';
import { AuthenticationService } from '../../services/authentication';
import { ImageService } from '../../services/image';

import { Account, Player } from '../../model/account';
import { Common } from '../../model/common';
import { ElementRequest } from '../../classes/requests/accountRequest';
import { Observable } from 'rxjs/Observable';

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

    constructor(
        private toastr: ToastsManager,
        private pageService: PageService,
        private accountService: AccountService,
        private imgService: ImageService,
        private authenticationService: AuthenticationService,
        private router: Router,
        public http: Http) {
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
                self.toastr.error("Номер должен быть числом");
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

    public dellPlayer(id, i) {
        var self = this;

        self.busy = self.accountService.DellPlayer(new ElementRequest(id)).then(response => {
            self.account.command.splice(i, 1);
            self.toastr.success("Игрок удален");
        });
    }

    public fileChanged(e: Event) {
        var target: HTMLInputElement = e.target as HTMLInputElement;

        this.upload(target.files[0]);
    }

    public upload(img: File) {
        var self = this;

        var formData: FormData = new FormData();
        formData.append("image", img, img.name);

        self.busy = self.imgService.GetImageAvatar(formData).then(response => {
            self.account.foto = response.txt;
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
