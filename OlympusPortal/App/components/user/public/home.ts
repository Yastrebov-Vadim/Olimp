import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { HomeService } from '../../../services/user/public';
import { GetNews, UrlContent } from '../../../model/user/news';
import { TopRequest } from '../../../classes/user/requests/newsRequest';

import { PageService } from '../../../services/page';
import { NewsService } from '../../../services/user/news';

@Component({
    selector: 'home',
    templateUrl: './home.html'
})
export class Home implements OnInit {
    public busy: Promise<any>;
    public isNews: boolean = false;
    public newss: GetNews[];
    
    constructor(
        private toastr: ToastsManager,
        private vcr: ViewContainerRef,
        private home: HomeService,
        private pageService: PageService,
        private newsService: NewsService) {

        var self = this;

        self.getNews();
    }

    ngOnInit(): void {
        var self = this;
        
        self.pageService.recipeSelected.emit(1);

        var slides = document.querySelectorAll('#slides .slide');
        var currentSlide = 0;

        var slideInterval = setInterval(nextSlide, 5000);

        function nextSlide() {
            slides[currentSlide].className = 'slide';
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].className = 'slide showing';
        }
    }

    public showImg(url: string, index: number) {
        var self = this;
        
        document.getElementById("display" + index).style.backgroundImage = url;
    }

    public getNews() {
        var self = this;
        self.busy = self.newsService.GetNewsTop(new TopRequest(true)).then(response => {
            self.newss = response.news;
                self.isNews = self.newss.length > 0 ? true : false;
        });
    }
}


