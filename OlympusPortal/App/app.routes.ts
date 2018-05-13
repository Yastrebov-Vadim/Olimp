import { Routes } from '@angular/router';
import { Common } from './model/user/common';
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

import { Login } from './components/admin/login/login';
import { NewsAdmin } from './components/admin/news/news';
import { AddNews } from './components/admin/add-news/add-news';
import { Turnament } from './components/admin/turnament/turnament';
import { TuningTurnament } from './components/admin/tuning-turnament/tuning-turnament';

const adminRoutes: Routes = [
    { path: Common.RoutePaths.News, component: NewsAdmin },
    { path: Common.RoutePaths.EditNews, component: AddNews },
    { path: Common.RoutePaths.Turnament, component: Turnament },
    { path: Common.RoutePaths.TuningTurnament, component: TuningTurnament },
];

export const AppRoutes: Routes = [
    { path: Common.RoutePaths.Home, component: Home },
    { path: Common.RoutePaths.Comand, component: Comand },
    { path: Common.RoutePaths.CurrentTournaments, component: CurrentTournaments },
    { path: Common.RoutePaths.NewTournaments, component: NewTournaments },
    { path: Common.RoutePaths.PastTournaments, component: PastTournaments },
    { path: Common.RoutePaths.Cabinet, component: Cabinet },
    { path: Common.RoutePaths.News, component: News },
    { path: Common.RoutePaths.Photo, component: Photo },
    { path: Common.RoutePaths.Video, component: Login },

    { path: Common.RoutePaths.Admin, component: Login },
    { path: Common.RoutePaths.Admin, component: Login, children: adminRoutes },

    { path: Common.RoutePaths.Any, component: Home }
]; 