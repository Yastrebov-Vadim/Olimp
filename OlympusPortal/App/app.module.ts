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
import { Home } from './components/public/home';
import { Comand } from './components/comand/comand';
import { CurrentTournaments } from './components/current-tournaments/current-tournaments';
import { NewTournaments } from './components/new-tournaments/new-tournaments';
import { PastTournaments } from './components/past-tournaments/past-tournaments';
import { Cabinet } from './components/cabinet/cabinet';
import { News } from './components/news/news';
import { Foto } from './components/foto/foto';

import { TransportService } from './services/transport';
import { HomeService } from './services/public';
import { AuthenticationService } from './services/authentication';
import { NewsService } from './services/news';
import { EmailService } from './services/email';
import { AccountService } from './services/account';
import { ImageService } from './services/image';

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
        Foto
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
        ImageService
    ],
    bootstrap: [
        App
    ]
})
export class AppModule { }