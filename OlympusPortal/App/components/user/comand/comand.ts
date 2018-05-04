import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

import { HomeService } from '../../../services/user/public';
import { PageService } from '../../../services/page';

import { Command } from '../../../model/user/command';

@Component({
    selector: 'command',
    templateUrl: './comand.html'
})
export class Comand implements OnInit {
    public busy: Promise<any>;
    public commands: Command[];

    constructor(
        private toastr: ToastsManager,
        private vcr: ViewContainerRef,
        private home: HomeService,
        private pageService: PageService) {
        
    }

    ngOnInit(): void {
        var self = this;
        self.pageService.recipeSelected.emit(3);
        self.getCommand();
    }

    public getCommand() {
        var self = this;

        self.busy = self.home.GetCommand().then(response => {
            self.commands = response.commands;
        });
    }
}


