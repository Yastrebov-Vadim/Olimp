import { Component, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router } from '@angular/router';
import { Http, RequestOptions } from '@angular/http';

import { PageService } from '../../../services/page';
import { TurnamentAdminService } from '../../../services/admin/turnament';

import { ElementRequest } from '../../../classes/admin/requests/ElementRequest';
import { Common } from '../../../model/user/common';
import { TurnamentInfo } from '../../../model/admin/turnament';


@Component({
    selector: 'turnament',
    templateUrl: './turnament.html'
})
export class Turnament implements OnInit {
    public busy: Promise<any>;
    public turnaments: TurnamentInfo[];
    public idTurnament: string = null;
    public index: number = null;

    constructor(
        private toastr: ToastsManager,
        private pageService: PageService,
        private turnamentService: TurnamentAdminService,
        private router: Router,
        public http: Http, ) {
        var self = this;

    }

    ngOnInit(): void {
        var self = this;
        self.pageService.recipeSelected.emit(9);
        self.getTurnamentInfo();
    }

    public getTurnamentInfo() {
        var self = this;
        self.busy = self.turnamentService.GetTurnamentInfo().then(response => {
            self.turnaments = response.turnaments;
        });
    }

    public addTurnament(isType, type) {
        var self = this;

        if (!isType) {
            self.toastr.error("Не выбран тип турнира");
            return;
        }

        self.busy = self.turnamentService.AddTurnament(new ElementRequest(type)).then(response => {
            self.router.navigate([Common.RoutePaths.Admin + Common.RoutePaths.Slash + Common.RoutePaths.TuningTurnament], {
                queryParams:
                    {
                        key: response.txt
                    }
            });
        });
    }

    public selectTurnament(id, i) {
        var self = this;

        self.idTurnament = id;
        self.index = i;
    }

    public dellTurnament() {
        var self = this;

        if (self.idTurnament == null && self.index == null)
            return;

        self.busy = self.turnamentService.DellTurnament(new ElementRequest(self.idTurnament)).then(response => {
            self.turnaments.splice(self.index, 1);
            self.idTurnament = null;
            self.index = null;
            self.toastr.success("Турнир удален");
        });
    }

    public editTurnament(id) {
        var self = this;

        self.router.navigate([Common.RoutePaths.Admin + Common.RoutePaths.Slash + Common.RoutePaths.TuningTurnament], {
            queryParams:
                {
                    key: id
                }
        });
    }
}
