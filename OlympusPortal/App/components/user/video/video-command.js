"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
var public_1 = require("../../../services/user/public");
var page_1 = require("../../../services/page");
var video_1 = require("../../../model/user/video");
var VideoCommand = (function () {
    function VideoCommand(toastr, vcr, home, pageService) {
        this.toastr = toastr;
        this.vcr = vcr;
        this.home = home;
        this.pageService = pageService;
        this.videos = new Array();
        this.sources = new Array();
        this.dateTo = null;
        this.pageSize = new Array();
        var self = this;
        self.getCommandFilter();
        self.videoTitle = 'ttttttttttttttttttt';
        self.sources.push('http://vjs.zencdn.net/v/oceans.mp4');
        self.videos.push(new video_1.Video("acean", 'http://vjs.zencdn.net/v/oceans.mp4'));
        self.videos.push(new video_1.Video("12.12.2332  арсенал vs дрова 1-3", '/content/video/videogular.mp4'));
        self.videos.push(new video_1.Video("acesssssssssssssssssan", 'http://vjs.zencdn.net/v/oceans.mp4'));
        self.videos.push(new video_1.Video(" angular", '/content/video/videogular.mp4'));
        self.videos.push(new video_1.Video("kkkssssss ssssssssssssss sssssssss ssskkk", 'http://vjs.zencdn.net/v/oceans.mp4'));
        self.videos.push(new video_1.Video("angular", '/content/video/videogular.mp4'));
        self.videos.push(new video_1.Video("acean", 'http://vjs.zencdn.net/v/oceans.mp4'));
        self.videos.push(new video_1.Video("acean", 'http://vjs.zencdn.net/v/oceans.mp4'));
        self.videos.push(new video_1.Video("acssssssssssss ssssssssssssss ssssssssean", 'http://vjs.zencdn.net/v/oceans.mp4'));
        self.videos.push(new video_1.Video("acean", 'http://vjs.zencdn.net/v/oceans.mp4'));
        self.videos.push(new video_1.Video("angular", '/content/video/videogular.mp4'));
    }
    VideoCommand.prototype.ngOnInit = function () {
        var self = this;
        self.pageService.recipeSelected.emit(6);
    };
    VideoCommand.prototype.getCommandFilter = function () {
        var self = this;
        self.busy = self.home.GetCommandFilter().then(function (response) {
            self.commandFilter = response.commandFilter;
        });
    };
    VideoCommand.prototype.showVideo = function (url, title) {
        var self = this;
        self.videoTitle = title;
        self.sources = new Array();
        self.sources.push(url);
    };
    VideoCommand.prototype.filterCommand = function (id, checked) {
        var self = this;
        if (checked) {
            self.commandId = id;
        }
        else {
            self.commandId = null;
        }
    };
    VideoCommand = __decorate([
        core_1.Component({
            selector: 'video-command',
            templateUrl: './video-command.html'
        }),
        __metadata("design:paramtypes", [ng2_toastr_1.ToastsManager,
            core_1.ViewContainerRef,
            public_1.HomeService,
            page_1.PageService])
    ], VideoCommand);
    return VideoCommand;
}());
exports.VideoCommand = VideoCommand;
//# sourceMappingURL=video-command.js.map