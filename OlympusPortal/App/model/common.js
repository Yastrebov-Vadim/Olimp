"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Common;
(function (Common) {
    var NavigationState = (function () {
        function NavigationState(route, backButton, queryParams, previousState, title) {
            if (title === void 0) { title = null; }
            this.route = route;
            this.backButton = backButton;
            this.queryParams = queryParams;
            this.previousState = previousState;
            this.title = title;
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
        RoutePaths.Foto = "foto";
        RoutePaths.PlanOpp = "plan/:key/:bt/:userId/:oppId";
        RoutePaths.Checkerboard = "checkerboard/:key/:type/:bt";
        RoutePaths.CheckerboardLead = "checkerboard/:key/:type/:bt/:leadId";
        RoutePaths.CheckerboardOpp = "checkerboard/:key/:type/:bt/:oppId";
        RoutePaths.CheckerDetail = "checkerDetail/:key/:type/:bt";
        RoutePaths.Any = '**';
        return RoutePaths;
    }());
    Common.RoutePaths = RoutePaths;
})(Common = exports.Common || (exports.Common = {}));
//# sourceMappingURL=common.js.map