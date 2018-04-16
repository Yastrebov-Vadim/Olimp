import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { IMyDpOptions } from 'mydatepicker';

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


        self.foto.push('url(./content/img/slade_home/slade1.jpg)');
        self.foto.push('url(./content/img/slade_home/slade2.jpg)');
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

    public showImg(url: string, index: number) {
        var self = this;

        document.getElementById("display" + index).style.backgroundImage = url;
    }

    public filterCommand(id, checked) {
        var self = this;

        console.dir(checked);
    }

    public filterDate(date) {
        var self = this;

        console.dir(date);
    }
}