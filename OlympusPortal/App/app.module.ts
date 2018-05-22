import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from './material.modul';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BusyModule } from 'angular2-busy';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { TextMaskModule } from 'angular2-text-mask';
import { MyDatePickerModule } from 'mydatepicker';

import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';

import { AppRoutes } from './app.routes';

import { App } from './app';
import { Home } from './components/user/public/home';
import { Comand } from './components/user/comand/comand';
import { CurrentTournaments } from './components/user/current-tournaments/current-tournaments';
import { NewTournaments } from './components/user/new-tournaments/new-tournaments';
import { PastTournaments } from './components/user/past-tournaments/past-tournaments';
import { Cabinet } from './components/user/cabinet/cabinet';
import { News } from './components/user/news/news';
import { Photo } from './components/user/photo/photo';
import { VideoCommand } from './components/user/video/video-command';

import { TransportService } from './services/transport';
import { HomeService } from './services/user/public';
import { AuthenticationService } from './services/user/authentication';
import { NewsService } from './services/user/news';
import { EmailService } from './services/user/email';
import { AccountService } from './services/user/account';
import { ImageService } from './services/user/image';
import { TurnamentService } from './services/user/turnament';

import { Login } from './components/admin/login/login';
import { NewsAdmin } from './components/admin/news/news';
import { AddNews } from './components/admin/add-news/add-news';
import { Turnament } from './components/admin/turnament/turnament';
import { TuningTurnament } from './components/admin/tuning-turnament/tuning-turnament';
import { CircleTurnament } from './components/admin/tuning-turnament/circle-turnament/circle-turnament';
import { MixedTurnament } from './components/admin/tuning-turnament/mixed-turnament/mixed-turnament';

import { AuthenticationAdminService } from './services/admin/authentication';
import { NewsAdminService } from './services/admin/news';
import { FileService } from './services/admin/file';
import { TurnamentAdminService } from './services/admin/turnament';


import { NewsType } from './pipe/newsType';
import { TurnamentType } from './pipe/turnamentType';
import { TurnamentStep } from './pipe/turnamentStep';

@NgModule({
    declarations: [
        App,
        Home,
        Comand,
        CurrentTournaments,
        NewTournaments,
        PastTournaments,
        Cabinet,
        News,
       Photo,
        VideoCommand,
        Login,
        NewsAdmin,
        NewsType,
        TurnamentType,
        TurnamentStep,
        AddNews,
        Turnament,
        TuningTurnament,
        CircleTurnament,
        MixedTurnament
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        TextMaskModule,
        ReactiveFormsModule,
        HttpModule,
        BusyModule,
        MaterialModule,
        BrowserAnimationsModule,
        VgCoreModule,
        MyDatePickerModule,
        VgControlsModule,
        ToastModule.forRoot(),
        RouterModule.forRoot(AppRoutes, {
            useHash: true
        })
    ],
    providers: [
        TransportService,
        ToastsManager,
        AuthenticationService,
        HomeService,
        NewsService,
        EmailService,
        AccountService,
        ImageService,
        AuthenticationAdminService,
        NewsAdminService,
        FileService,
        TurnamentAdminService,
        TurnamentService
    ],
    bootstrap: [
        App
    ]
})
export class AppModule { }