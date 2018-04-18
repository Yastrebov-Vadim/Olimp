import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';

import { HomeService } from '../../services/public';
import { PageService } from '../../services/page';

import { CommandFilter } from '../../model/command';
import { NewsBriefly, UrlContent } from '../../model/news';

@Component({
    selector: 'foto',
    templateUrl: './foto.html'
})
export class Foto implements OnInit {
    public busy: Promise<any>;
    public commandFilter: CommandFilter[];
    public foto = new Array<string>();
    public display: string;
    public dateTo: Date = null;

    public myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'dd.mm.yyyy'
    };

    constructor(
        private toastr: ToastsManager,
        private vcr: ViewContainerRef,
        private home: HomeService,
        private pageService: PageService) {
        var self = this;

        self.getCommandFilter();

        self.display = 'url(./content/img/slade_home/slade1.jpg)';
        self.foto.push('url(./content/img/slade_home/slade1.jpg)');
        self.foto.push('url(./content/img/slade_home/slade2.jpg)');
        self.foto.push('url(./content/img/slade_home/slade3.jpg)');
        self.foto.push('url(./content/img/slade_home/slade4.jpg)');
        self.foto.push('url(./content/img/slade_home/slade5.jpg)');
        self.foto.push('url(./content/img/slade_home/slade1.jpg)');
        self.foto.push('url(./content/img/slade_home/slade2.jpg)');
        self.foto.push('url(./content/img/ava.png)');
        self.foto.push('url(./content/img/slade_home/slade4.jpg)');
        self.foto.push('url(./content/img/slade_home/slade5.jpg)');
        self.foto.push('url(./content/img/slade_home/slade1.jpg)');
        self.foto.push('url(./content/img/background3.jpg)');
        self.foto.push('url(./content/img/slade_home/slade3.jpg)');
        self.foto.push('url(./content/img/slade_home/slade4.jpg)');
        self.foto.push('url(./content/img/slade_home/slade5.jpg)');
        self.foto.push('url(./content/img/slade_home/slade1.jpg)');
        self.foto.push('url(./content/img/slade_home/slade2.jpg)');
        self.foto.push('url(./content/img/slade_home/slade3.jpg)');
        self.foto.push('url(./content/img/slade_home/slade4.jpg)');
        self.foto.push('url(./content/img/slade_home/slade5.jpg)');

    }

    ngOnInit(): void {
        var self = this;
        self.pageService.recipeSelected.emit(5);
    }

    public getCommandFilter() {
        var self = this;

        self.busy = self.home.GetCommandFilter().then(response => {
            self.commandFilter = response.commandFilter;
        });
    }

    public showImg(url: string) {
        var self = this;

        self.display = url;
    }

    public filterCommand(id, checked) {
        var self = this;

        console.dir(checked);
        var D = self.dateTo;
    }

    public filterDate(event: IMyDateModel, type) {
        var self = this;

        switch (type) {
            case 1: 
                console.dir("1- " + event);
                break;
            case 2: 
                console.dir("2- " + event);
                break;
        }
    }
}