﻿import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { HomeService } from '../../services/public';
import { NewsBriefly, UrlContent } from '../../model/news';

import { PageService } from '../../services/page';
import { NewsService } from '../../services/news';

@Component({
    selector: 'home',
    templateUrl: './home.html'
})
export class Home implements OnInit {
    public busy: Promise<any>;
    public bank: string;
    public newss: NewsBriefly[];
    
    constructor(
        private toastr: ToastsManager,
        private vcr: ViewContainerRef,
        private home: HomeService,
        private pageService: PageService,
        private newsService: NewsService) {

        var self = this;

        self.getNews();
        var urlVideo = 'http://vjs.zencdn.net/v/oceans.mp4';
        var urlFoto = new Array<string>();

        urlFoto.push('url(./content/img/slade_home/slade1.jpg)');
        urlFoto.push('url(./content/img/slade_home/slade2.jpg)');
        urlFoto.push('url(./content/img/slade_home/slade3.jpg)');
        urlFoto.push('url(./content/img/slade_home/slade4.jpg)');
        urlFoto.push('url(./content/img/slade_home/slade5.jpg)');
        urlFoto.push('url(./content/img/slade_home/slade1.jpg)');
        urlFoto.push('url(./content/img/slade_home/slade2.jpg)');
        urlFoto.push('url(./content/img/slade_home/slade3.jpg)');
        urlFoto.push('url(./content/img/slade_home/slade4.jpg)');
        urlFoto.push('url(./content/img/slade_home/slade5.jpg)');

       
        var news = new NewsBriefly('url(./content/img/slade_home/slade1.jpg)', 'В новом мини-футбольном сезоне 2017/18', 'Предлагаем всем желающим командам заявиться на III чемпионат Саратова по мини-футболу среди любительских команд. Организатором данного турнира является спортивное общество "Олимп"...', '12.12.2017', 1, null, null);
        var news2 = new NewsBriefly(null, 'Новый турнир', null, '12.12.2017', 2, urlVideo, urlFoto);
        var news4 = new NewsBriefly(null, 'Новый турнир', null, '12.12.2017', 2, '/content/video/videogular.mp4', urlFoto);
        var news3 = new NewsBriefly(null, 'Фотоотчет сезоне 2017/18', null, '12.12.2017', 3, urlVideo, urlFoto);

        this.newss = new Array<NewsBriefly>();
        this.newss.push(news);
        this.newss.push(news3);
        this.newss.push(news2);
        this.newss.push(news);
        this.newss.push(news3);
        this.newss.push(news4);
        this.newss.push(news);
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
        //self.busy = self.newsService.GetNewsBriefly().then(response => {
        //    self.newss = response.newsBriefly;
        //});
    }
}


