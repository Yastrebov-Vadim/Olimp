import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';

import { HomeService } from '../../../services/user/public';
import { PageService } from '../../../services/page';

import { CommandFilter } from '../../../model/user/command';
import { Video } from '../../../model/user/video';

@Component({
    selector: 'video-command',
    templateUrl: './video-command.html'
})
export class VideoCommand implements OnInit {
    public busy: Promise<any>;
    public commandFilter: CommandFilter[];
    public videos = new Array<Video>();
    public videoTitle: string;
    public sources = new Array<string>();
    public dateTo: Date = null;
    public commandId: string;
    public pageSize: number[] = new Array<number>();

    constructor(
        private toastr: ToastsManager,
        private vcr: ViewContainerRef,
        private home: HomeService,
        private pageService: PageService) {
        var self = this;

        self.getCommandFilter();

        self.videoTitle = 'ttttttttttttttttttt';
        self.sources.push('http://vjs.zencdn.net/v/oceans.mp4');
        self.videos.push(new Video("acean", 'http://vjs.zencdn.net/v/oceans.mp4'));
        self.videos.push(new Video("12.12.2332  арсенал vs дрова 1-3",'/content/video/videogular.mp4'));
        self.videos.push(new Video("acesssssssssssssssssan", 'http://vjs.zencdn.net/v/oceans.mp4'));
        self.videos.push(new Video(" angular", '/content/video/videogular.mp4'));
        self.videos.push(new Video("kkkssssss ssssssssssssss sssssssss ssskkk", 'http://vjs.zencdn.net/v/oceans.mp4'));
        self.videos.push(new Video("angular", '/content/video/videogular.mp4'));
        self.videos.push(new Video("acean", 'http://vjs.zencdn.net/v/oceans.mp4'));
        self.videos.push(new Video("acean", 'http://vjs.zencdn.net/v/oceans.mp4'));
        self.videos.push(new Video("acssssssssssss ssssssssssssss ssssssssean", 'http://vjs.zencdn.net/v/oceans.mp4'));
        self.videos.push(new Video("acean", 'http://vjs.zencdn.net/v/oceans.mp4'));
        self.videos.push(new Video("angular", '/content/video/videogular.mp4'));
    }

    ngOnInit(): void {
        var self = this;
        self.pageService.recipeSelected.emit(6);
    }

    public getCommandFilter() {
        var self = this;

        self.busy = self.home.GetCommandFilter().then(response => {
            self.commandFilter = response.commandFilter;
        });
    }

    public showVideo(url: string, title: string) {
        var self = this;
        self.videoTitle = title;
        
        self.sources = new Array<string>();
        self.sources.push(url);
    }

    public filterCommand(id: string, checked) {
        var self = this;

        if (checked) {
            self.commandId = id;
        }
        else {
            self.commandId = null;
        }
    }
}