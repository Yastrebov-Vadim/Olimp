import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { HomeService } from '../../../services/user/public';
import { PageService } from '../../../services/page';

import { CommandFilter } from '../../../model/user/command';
import { Display } from '../../../model/user/photo';
import { GetPhotoRequest } from '../../../classes/user/requests/photoRequest';
import { GetPhotoResponse } from '../../../classes/user/response/photoResponse';

@Component({
    selector: 'photo',
    templateUrl: './photo.html'
})
export class Photo implements OnInit {
    public busy: Promise<any>;
    public commandFilter: CommandFilter[];
    public pagePhotos: GetPhotoResponse = new GetPhotoResponse(null, null, null);
    public display: Display = new Display(null, null);
    public commandId: string;
    public pageSize: number[] = new Array<number>();

    constructor(
        private toastr: ToastsManager,
        private vcr: ViewContainerRef,
        private home: HomeService,
        private pageService: PageService) {
        var self = this;

        self.getPhoto(1);
        self.getCommandFilter();
    }

    ngOnInit(): void {
        var self = this;
        self.pageService.recipeSelected.emit(5);
    }

    public getPhoto(page) {
        var self = this;

        self.busy = self.home.GetPhoto(new GetPhotoRequest(page, self.commandId)).then(response => {
            self.pagePhotos = response;
            self.pageSize = new Array<number>();
            for (let i = 2; i < self.pagePhotos.pageSize; i++) {
                self.pageSize.push(i)
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
            self.commandId = id;
            self.getPhoto(self.pagePhotos.currentPage);
        }
        else {
            self.commandId = null;
            self.getPhoto(self.pagePhotos.currentPage);
        }
    }


    public photoShowStyle() {
        var self = this;

        var top = (window.outerHeight - 700) / 2;

        return {
            "margin-top": top + "px"
        }
    }

    public pageStyle(page) {
        var self = this;

        if ((self.pagePhotos.currentPage + 2 < page || self.pagePhotos.currentPage - 2 > page) && (page != self.pagePhotos.pageSize && page != 1))
            return {
                "display": "none"
            }

        if (self.pagePhotos.currentPage == page)
            return {
                "color": "#00ff2d",
                "font-size": "20px"
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
            self.display.position = self.pagePhotos.photos.length - 1;
        else
            self.display.position--;

        self.display.url = self.pagePhotos.photos[self.display.position];
    }

    public nextRightPhoto() {
        var self = this;

        if (self.display.position >= self.pagePhotos.photos.length - 1)
            self.display.position = 0;
        else
            self.display.position++;

        self.display.url = self.pagePhotos.photos[self.display.position];
    }

    public nextLeftPage() {
        var self = this;
        if (self.pagePhotos.currentPage <= 1)
            return;
        self.getPhoto(self.pagePhotos.currentPage - 1);
    }

    public nextRightPage() {
        var self = this;
        if (self.pagePhotos.pageSize < self.pagePhotos.currentPage + 1)
            return;
        self.getPhoto(self.pagePhotos.currentPage + 1);
    }

    public getPage(page) {
        var self = this;

        if (self.pagePhotos.currentPage == page)
            return;

        self.getPhoto(page);
    }
}