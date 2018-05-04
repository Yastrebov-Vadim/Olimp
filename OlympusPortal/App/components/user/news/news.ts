import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

import { NewsService } from '../../../services/user/news';
import { PageService } from '../../../services/page';

import { Command } from '../../../model/user/command';
import { GetNews, UrlContent } from '../../../model/user/news';
import { TopRequest } from '../../../classes/user/requests/newsRequest';

@Component({
    selector: 'news',
    templateUrl: './news.html'
})
export class News implements OnInit {
    public busy: Promise<any>;
    public commands: Command[];
    public newss: GetNews[];

    constructor(
        private toastr: ToastsManager,
        private vcr: ViewContainerRef,
        private newsService: NewsService,
        private pageService: PageService) {
        var self = this;

        self.getNews();
 
    }

    ngOnInit(): void {
        var self = this;
        self.pageService.recipeSelected.emit(4);
    }

    public showImg(url: string, index: number) {
        var self = this;

        document.getElementById("display" + index).style.backgroundImage = url;
    }

    public getNews() {
        var self = this;
        self.busy = self.newsService.GetNewsActive(new TopRequest(false)).then(response => {
            self.newss = response.news;
        });
    }
}