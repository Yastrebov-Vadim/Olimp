import { Component, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router } from '@angular/router';

import { PageService } from '../../../services/page';
import { TurnamentAdminService } from '../../../services/admin/turnament';
import { Arena } from '../../../model/admin/turnament';
import { ElementRequest } from '../../../classes/admin/requests/elementRequest';

@Component({
    selector: 'arens-admin',
    templateUrl: './arens.html'
})
export class ArensAdmin implements OnInit {
    public busy: Promise<any>;
    public arens: Arena[];
    public arenaName: string; 
    public arenaId: string; 
    public index: number; 
    
    constructor(
        private toastr: ToastsManager,
        private pageService: PageService,
        private turnamentService: TurnamentAdminService) {
        var self = this;
    }

    ngOnInit(): void {
        var self = this;
        self.pageService.recipeSelected.emit(10);
        self.getArens();
    }

    public getArens() {
        var self = this;
        self.busy = self.turnamentService.GetArena().then(response => {
            self.arens = response.arens;
        });
    }

    public addArenaBlockStyle() {
        var self = this;
        var top = (window.outerHeight - 500) / 2;

        return {
            "margin-top": top + "px"
        }
    }
    
    public close() {
        document.getElementById("transparent-layer-arena").style.display = "none";
    }

    public openFormAddArena() {
        var self = this;

        document.getElementById("transparent-layer-arena").style.display = "block";
    }

    public addArena(isValid) {
        var self = this;

        if (isValid) {
            self.toastr.error("Все поля должны быть заполнены");
            return;
        }
        
        self.busy = self.turnamentService.AddArena(new ElementRequest(self.arenaName)).then(response => {
            self.arens.push(new Arena(response.txt, self.arenaName))
            self.arenaName = null;
            self.close();
            self.toastr.success("Арена добавлен в систему");
        });
    }

    public selectArena(arenaId, index) {
        var self = this;

        self.arenaId = arenaId;
        self.index = index;
    }

    public dellArena() {
        var self = this;

        if (self.arenaId == null || self.index == null)
            return;

        self.busy = self.turnamentService.DellArena(new ElementRequest(self.arenaId)).then(response => {
            self.arens.splice(self.index, 1);
            self.arenaId = null;
            self.index = null;
            self.toastr.success("Арена удалена");
        });
    }
}