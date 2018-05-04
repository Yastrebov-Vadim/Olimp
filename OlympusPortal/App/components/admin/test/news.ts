import { Component, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router } from '@angular/router';
import { Http, RequestOptions } from '@angular/http';

import { PageService } from '../../../services/page';

@Component({
    selector: 'news-admin',
    templateUrl: './news.html'
})
export class NewsAdmin implements OnInit {
    public busy: Promise<any>;

    constructor(
        private toastr: ToastsManager,
        private pageService: PageService,
        private router: Router,
        public http: Http,) {
        var self = this;
    }

    ngOnInit(): void {
        var self = this;
        self.pageService.recipeSelected.emit(8);
    }
}
