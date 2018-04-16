"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("./model/common");
var home_1 = require("./components/public/home");
var comand_1 = require("./components/comand/comand");
var current_tournaments_1 = require("./components/current-tournaments/current-tournaments");
var new_tournaments_1 = require("./components/new-tournaments/new-tournaments");
var past_tournaments_1 = require("./components/past-tournaments/past-tournaments");
var cabinet_1 = require("./components/cabinet/cabinet");
var news_1 = require("./components/news/news");
var foto_1 = require("./components/foto/foto");
exports.AppRoutes = [
    { path: common_1.Common.RoutePaths.Home, component: home_1.Home },
    { path: common_1.Common.RoutePaths.Comand, component: comand_1.Comand },
    { path: common_1.Common.RoutePaths.CurrentTournaments, component: current_tournaments_1.CurrentTournaments },
    { path: common_1.Common.RoutePaths.NewTournaments, component: new_tournaments_1.NewTournaments },
    { path: common_1.Common.RoutePaths.PastTournaments, component: past_tournaments_1.PastTournaments },
    { path: common_1.Common.RoutePaths.Cabinet, component: cabinet_1.Cabinet },
    { path: common_1.Common.RoutePaths.News, component: news_1.News },
    { path: common_1.Common.RoutePaths.Foto, component: foto_1.Foto },
];
//# sourceMappingURL=app.routes.js.map