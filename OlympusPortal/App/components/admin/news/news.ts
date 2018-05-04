import { Component, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router } from '@angular/router';
import { Http, RequestOptions } from '@angular/http';

import { PageService } from '../../../services/page';
import { NewsAdminService } from '../../../services/admin/news';
import { GetNewsInfo } from '../../../model/admin/news';
import { Common } from '../../../model/user/common';
import { ElementRequest } from '../../../classes/admin/requests/ElementRequest';

@Component({
    selector: 'news-admin',
    templateUrl: './news.html'
})
export class NewsAdmin implements OnInit {
    public busy: Promise<any>;
    public isAuthAdmin: boolean;
    public isText: boolean = false;
    public isPhoto: boolean = false;
    public isVideo: boolean = false;
    public newsInfo: GetNewsInfo[];

    constructor(
        private toastr: ToastsManager,
        private pageService: PageService,
        private newsService: NewsAdminService,
        private router: Router,
        public http: Http, ) {
        var self = this;
    }

    ngOnInit(): void {
        var self = this;
        self.pageService.recipeSelected.emit(8);
        self.getNewsInfo();
    }

    public getNewsInfo() {
        var self = this;
        self.busy = self.newsService.GetNewsInfo().then(response => {
            self.newsInfo = response.news;
        });
    }

    public addNews() {
        var self = this;

        if (!self.isText && !self.isPhoto && !self.isVideo) {
            self.toastr.error("Не выбран тип новости");
            return;
        }
        
        self.busy = self.newsService.AddNews(new ElementRequest((self.isText ? 1 : self.isPhoto ? 2 : 3).toString())).then(response => {
            self.router.navigate([Common.RoutePaths.Admin + Common.RoutePaths.Slash + Common.RoutePaths.EditNews], {
                queryParams:
                    {
                        key: response.txt
                    }
            });
        });
    }

    public dellNews(id, index) {
        var self = this;

        self.busy = self.newsService.DellNews(new ElementRequest(id)).then(response => {
            self.newsInfo.splice(index, 1);
            self.toastr.success("Новость удалена");
        });
    }

    public editNews(id) {
        var self = this;
      
            self.router.navigate([Common.RoutePaths.Admin + "/" + Common.RoutePaths.EditNews], {
                queryParams:
                    {
                        key: id
                    }
        });
    }

    public active(id) {
        var self = this;

        self.busy = self.newsService.ActiveNews(new ElementRequest(id)).then(response => {
            self.toastr.success("Новость " + response.txt);
        });
    }
}
