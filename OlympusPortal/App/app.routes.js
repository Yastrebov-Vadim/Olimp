"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("./model/user/common");
var home_1 = require("./components/user/public/home");
var comand_1 = require("./components/user/comand/comand");
var current_tournaments_1 = require("./components/user/current-tournaments/current-tournaments");
var new_tournaments_1 = require("./components/user/new-tournaments/new-tournaments");
var past_tournaments_1 = require("./components/user/past-tournaments/past-tournaments");
var cabinet_1 = require("./components/user/cabinet/cabinet");
var news_1 = require("./components/user/news/news");
var photo_1 = require("./components/user/photo/photo");
var login_1 = require("./components/admin/login/login");
var news_2 = require("./components/admin/news/news");
var add_news_1 = require("./components/admin/add-news/add-news");
var adminRoutes = [
    { path: common_1.Common.RoutePaths.News, component: news_2.NewsAdmin },
    { path: common_1.Common.RoutePaths.EditNews, component: add_news_1.AddNews },
];
exports.AppRoutes = [
    { path: common_1.Common.RoutePaths.Home, component: home_1.Home },
    { path: common_1.Common.RoutePaths.Comand, component: comand_1.Comand },
    { path: common_1.Common.RoutePaths.CurrentTournaments, component: current_tournaments_1.CurrentTournaments },
    { path: common_1.Common.RoutePaths.NewTournaments, component: new_tournaments_1.NewTournaments },
    { path: common_1.Common.RoutePaths.PastTournaments, component: past_tournaments_1.PastTournaments },
    { path: common_1.Common.RoutePaths.Cabinet, component: cabinet_1.Cabinet },
    { path: common_1.Common.RoutePaths.News, component: news_1.News },
    { path: common_1.Common.RoutePaths.Photo, component: photo_1.Photo },
    { path: common_1.Common.RoutePaths.Video, component: login_1.Login },
    { path: common_1.Common.RoutePaths.Admin, component: login_1.Login },
    { path: common_1.Common.RoutePaths.Admin, component: login_1.Login, children: adminRoutes },
    { path: common_1.Common.RoutePaths.Any, component: home_1.Home }
];
//# sourceMappingURL=app.routes.js.map