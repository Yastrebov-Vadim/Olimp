import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';

import { HomeService } from '../../../services/user/public';
import { PageService } from '../../../services/page';

import { CommandFilter } from '../../../model/user/command';
import { PhotoCommand, Display } from '../../../model/user/photo';

@Component({
    selector: 'photo',
    templateUrl: './photo.html'
})
export class Photo implements OnInit {
    public busy: Promise<any>;
    public commandFilter: CommandFilter[];
    public photos: PhotoCommand[] = new Array<PhotoCommand>();
    public display: Display = new Display(null, null);
   //public dateTo: Date = null;
   //public dateEnd: Date = null;
    public commandsId: string[] = new Array<string>();

    public myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'dd.mm.yyyy'
    };

    constructor(
        private toastr: ToastsManager,
        private vcr: ViewContainerRef,
        private home: HomeService,
        private pageService: PageService) {
        var self = this;

        self.getPhoto();
        self.getCommandFilter();
    }

    ngOnInit(): void {
        var self = this;
        self.pageService.recipeSelected.emit(5);
    }

    public getPhoto() {
        var self = this;

        self.busy = self.home.GetPhoto().then(response => {
            self.display.url = response.photos[0].url;
            self.display.position = 0;
            self.photos = response.photos;
            for (let i = 0; i < self.photos.length; i++) {
                self.photos[i].isShow = true;
            }
        });
    }

    public getCommandFilter() {
        var self = this;

        self.busy = self.home.GetCommandFilter().then(response => {
            self.commandFilter = response.commandFilter;
        });
    }

    public filterCommand(id: string, checked) {
        var self = this;
        
        if (checked) {
            self.commandsId.push(id);
        }
        else {
            for (let i = 0; i < self.commandsId.length; i++) {
                if (self.commandsId[i] == id)
                    self.commandsId.splice(i, 1);
            }
        }

    
    }

    //public filterDate(event: IMyDateModel, type) {
    //    var self = this;
    //    var date = event.date;
    //    switch (type) {
    //        case 1:
    //            if (date.year != 0)
    //                self.dateTo = new Date(date.year, date.month - 1, date.day);
    //            else
    //                self.dateTo = null;
    //            break;
    //        case 2:
    //            if (date.year != 0)
    //                self.dateEnd = new Date(date.year, date.month - 1, date.day);
    //            else
    //                self.dateEnd = null;
    //            break;
    //    }
    //}

    public photoStyle(isShow) {

        if (isShow)
            return { "display": "inline-block" }

        else
            return { "display": "none" }
    }

    public photoShowStyle() {
        var self = this;

        var top = (window.outerHeight - 700) / 2;

        return {
            "margin-top": top + "px"
        }
    }

    public openPhoto(url: string, position: number) {
        var self = this;

        self.display.url = url;
        self.display.position = position;
        document.getElementById("photo-layer").style.display = "block";
    }

    public closePhoto() {
        document.getElementById("photo-layer").style.display = "none";
    }

    public nextLeftPhoto() {
        var self = this;

        if (self.display.position <= 0)
            self.display.position = self.photos.length - 1;
        else
            self.display.position--;

        self.display.url = self.photos[self.display.position].url;
    }

    public nextRightPhoto() {
        var self = this;

        if (self.display.position >= self.photos.length-1)
            self.display.position = 0;
        else
            self.display.position++;

        self.display.url = self.photos[self.display.position].url;
    }
}