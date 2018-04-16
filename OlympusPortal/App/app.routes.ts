import { Routes } from '@angular/router';
import { Common } from './model/common';
import { App } from './app';

import { Home } from './components/public/home';
import { Comand } from './components/comand/comand';
import { CurrentTournaments } from './components/current-tournaments/current-tournaments';
import { NewTournaments } from './components/new-tournaments/new-tournaments';
import { PastTournaments } from './components/past-tournaments/past-tournaments';
import { Cabinet } from './components/cabinet/cabinet';
import { News } from './components/news/news';
import { Foto } from './components/foto/foto';

export const AppRoutes: Routes = [
    { path: Common.RoutePaths.Home, component: Home },
    { path: Common.RoutePaths.Comand, component: Comand },
    { path: Common.RoutePaths.CurrentTournaments, component: CurrentTournaments },
    { path: Common.RoutePaths.NewTournaments, component: NewTournaments },
    { path: Common.RoutePaths.PastTournaments, component: PastTournaments },
    { path: Common.RoutePaths.Cabinet, component: Cabinet },
    { path: Common.RoutePaths.News, component: News },
    { path: Common.RoutePaths.Foto, component: Foto },
];