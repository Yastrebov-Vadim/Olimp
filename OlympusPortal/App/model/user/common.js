"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Common;
(function (Common) {
    var NavigationState = (function () {
        function NavigationState(route, queryParams) {
            this.route = route;
            this.queryParams = queryParams;
        }
        return NavigationState;
    }());
    Common.NavigationState = NavigationState;
    var RoutePaths = (function () {
        function RoutePaths() {
        }
        RoutePaths.Home = "";
        RoutePaths.Comand = "comand";
        RoutePaths.CurrentTournaments = "current-tournaments";
        RoutePaths.NewTournaments = "new-tournaments";
        RoutePaths.PastTournaments = "past-tournaments";
        RoutePaths.Cabinet = "cabinet";
        RoutePaths.News = "news";
        RoutePaths.Photo = "photo";
        RoutePaths.Video = "video";
        RoutePaths.Admin = "admin";
        RoutePaths.EditNews = "edit-news/:key";
        RoutePaths.Turnament = "turnament";
        RoutePaths.TuningTurnament = "tuning-turnament/:key";
        RoutePaths.PlanOpp = "plan/:key/:bt/:userId/:oppId";
        RoutePaths.Checkerboard = "checkerboard/:key/:type/:bt";
        RoutePaths.CheckerboardLead = "checkerboard/:key/:type/:bt/:leadId";
        RoutePaths.CheckerboardOpp = "checkerboard/:key/:type/:bt/:oppId";
        RoutePaths.CheckerDetail = "checkerDetail/:key/:type/:bt";
        RoutePaths.Slash = "/";
        RoutePaths.Any = '**';
        return RoutePaths;
    }());
    Common.RoutePaths = RoutePaths;
})(Common = exports.Common || (exports.Common = {}));
//# sourceMappingURL=common.js.map