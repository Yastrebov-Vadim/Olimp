"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var material_modul_1 = require("./material.modul");
var animations_1 = require("@angular/platform-browser/animations");
var angular2_busy_1 = require("angular2-busy");
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
var ng2_toastr_2 = require("ng2-toastr/ng2-toastr");
var angular2_text_mask_1 = require("angular2-text-mask");
var mydatepicker_1 = require("mydatepicker");
var core_2 = require("videogular2/core");
var controls_1 = require("videogular2/controls");
var app_routes_1 = require("./app.routes");
var app_1 = require("./app");
var home_1 = require("./components/user/public/home");
var comand_1 = require("./components/user/comand/comand");
var current_tournaments_1 = require("./components/user/current-tournaments/current-tournaments");
var new_tournaments_1 = require("./components/user/new-tournaments/new-tournaments");
var past_tournaments_1 = require("./components/user/past-tournaments/past-tournaments");
var cabinet_1 = require("./components/user/cabinet/cabinet");
var news_1 = require("./components/user/news/news");
var photo_1 = require("./components/user/photo/photo");
var video_command_1 = require("./components/user/video/video-command");
var transport_1 = require("./services/transport");
var public_1 = require("./services/user/public");
var authentication_1 = require("./services/user/authentication");
var news_2 = require("./services/user/news");
var email_1 = require("./services/user/email");
var account_1 = require("./services/user/account");
var image_1 = require("./services/user/image");
var login_1 = require("./components/admin/login/login");
var news_3 = require("./components/admin/news/news");
var add_news_1 = require("./components/admin/add-news/add-news");
var authentication_2 = require("./services/admin/authentication");
var news_4 = require("./services/admin/news");
var file_1 = require("./services/admin/file");
var newsType_1 = require("./pipe/newsType");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_1.App,
                home_1.Home,
                comand_1.Comand,
                current_tournaments_1.CurrentTournaments,
                new_tournaments_1.NewTournaments,
                past_tournaments_1.PastTournaments,
                cabinet_1.Cabinet,
                news_1.News,
                photo_1.Photo,
                video_command_1.VideoCommand,
                login_1.Login,
                news_3.NewsAdmin,
                newsType_1.NewsType,
                add_news_1.AddNews
            ],
            imports: [
                platform_browser_1.BrowserModule,
                animations_1.BrowserAnimationsModule,
                forms_1.FormsModule,
                angular2_text_mask_1.TextMaskModule,
                forms_1.ReactiveFormsModule,
                http_1.HttpModule,
                angular2_busy_1.BusyModule,
                material_modul_1.MaterialModule,
                animations_1.BrowserAnimationsModule,
                core_2.VgCoreModule,
                mydatepicker_1.MyDatePickerModule,
                controls_1.VgControlsModule,
                ng2_toastr_1.ToastModule.forRoot(),
                router_1.RouterModule.forRoot(app_routes_1.AppRoutes, {
                    useHash: true
                })
            ],
            providers: [
                transport_1.TransportService,
                ng2_toastr_2.ToastsManager,
                authentication_1.AuthenticationService,
                public_1.HomeService,
                news_2.NewsService,
                email_1.EmailService,
                account_1.AccountService,
                image_1.ImageService,
                authentication_2.AuthenticationAdminService,
                news_4.NewsAdminService,
                file_1.FileService
            ],
            bootstrap: [
                app_1.App
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map