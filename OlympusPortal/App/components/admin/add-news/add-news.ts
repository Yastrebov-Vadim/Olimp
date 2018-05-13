import { Component, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router, ActivatedRoute } from '@angular/router';

import { NewsAdminService } from '../../../services/admin/news';
import { FileService } from '../../../services/admin/file';
import { HomeService } from '../../../services/user/public';

import { ElementRequest } from '../../../classes/admin/requests/ElementRequest';
import { SetNews } from '../../../model/admin/news';
import { Common } from '../../../model/user/common';
import { GetNews, UrlPhotosNews } from '../../../model/admin/news';
import { FileBd } from '../../../model/admin/file';
import { CommandFilter } from '../../../model/user/command';

@Component({
    selector: 'add-news',
    templateUrl: './add-news.html'
})

export class AddNews implements OnInit {
    public busy: Promise<any>;
    public id: string;
    public videos: string[] = new Array < string>();
    public news: GetNews = new GetNews(null, null, null, null, null, null, null, null, null, null);
    public files: File[] = new Array<File>();
    public commandFilter: CommandFilter[];

    constructor(
        private toastr: ToastsManager,
        private newsService: NewsAdminService,
        private fileService: FileService,
        private home: HomeService,
        private router: Router,
        private route: ActivatedRoute) {
        var self = this;

        route.queryParams.subscribe(
            params => {
                self.id = params["key"];
            });

        self.getNews(self.id);
        self.getCommandFilter();
    }

    ngOnInit(): void {
    }

    public getNews(id) {
        var self = this;
        self.busy = self.newsService.GetNews(new ElementRequest(id)).then(response => {
            self.news = response.news;
            self.videos.push(response.news.urlVideo);
        });
    }

    public fileChangedTypeText(e: Event) {
        var self = this;

        var target: HTMLInputElement = e.target as HTMLInputElement;
        var formData: FormData = new FormData();
        formData.append("image", target.files[0], self.id);

        self.busy = self.fileService.AddImgNewsTypeText(formData).then(response => {
            self.news.photo[0].url = response.photo.url;
            self.toastr.success("Изображение загружено");
        });
    }

    public fileChangedTypePhoto(e: Event) {
        var self = this;

        self.files = [];
        var target: HTMLInputElement = e.target as HTMLInputElement;

        for (let i = 0; i < target.files.length; i++) {
            self.files.push(target.files[i]);
        }

        self.loadImg(0);
    }

    public fileChangedVideo(e: Event) {
        var self = this;

        var target: HTMLInputElement = e.target as HTMLInputElement;
        var formData: FormData = new FormData();
        formData.append("video", target.files[0], self.id);

        self.busy = self.fileService.AddVideoForNews(formData).then(response => {
            self.videos[0] = response.txt;
            self.toastr.success("Видео загружено");
        });
    }
    
    public loadImg(i) {
        var self = this;
        var formData: FormData = new FormData();
        formData.append("image", self.files[i], self.id);

        self.busy = self.fileService.AddImgNewsTypePhoto(formData).then(response => {
            self.news.photo.push(response.photo);

            if (i < self.files.length - 1)
                self.loadImg(i + 1);
            else
                self.toastr.success("Загружено");
        });
    }

    public saveNews() {
        var self = this;

        if (self.news.title == (null || "") || self.news.text == (null || "")) {
            self.toastr.error("Не все поля заполнены");
            return;
        }

        self.busy = self.newsService.SaveNews(new SetNews(self.news.id, self.news.title, self.news.text, self.news.top, self.news.commandOne, self.news.commandTwo)).then(response => {
            self.toastr.success("Сохранено");
        });
    }

    public back() {
        var self = this;

        self.router.navigate([Common.RoutePaths.Admin + Common.RoutePaths.Slash + Common.RoutePaths.News], {});
    }

    public preview() {
        var self = this;

        document.getElementById("preview-layer").style.display = "block";
    }

    public close() {
        document.getElementById("preview-layer").style.display = "none";
    }

    public dellPhotoForNews(id, i) {
        var self = this;

        self.busy = self.fileService.DellPhoto(new ElementRequest(id)).then(response => {
            self.news.photo.splice(i, 1);
            self.toastr.success("Удалено");
        });
    }

    public isPhoto() {
        var self = this;

        return self.news.photo.length > 0
    }

    public getCommandFilter() {
        var self = this;

        self.busy = self.home.GetCommandFilter().then(response => {
            self.commandFilter = response.commandFilter;
        });
    }
} 
