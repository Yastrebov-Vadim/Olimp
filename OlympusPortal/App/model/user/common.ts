import { Route } from '@angular/router';
export module Common {
    export class NavigationState {
        public route: Route;
        public queryParams: any;

        constructor(route: Route, queryParams: any) {
            this.route = route;
            this.queryParams = queryParams;
        }
    }

    export class RoutePaths {
        public static Home = "";
        public static Comand = "comand";
        public static CurrentTournaments = "current-tournaments";
        public static NewTournaments = "new-tournaments";
        public static PastTournaments = "past-tournaments";
        public static Cabinet = "cabinet";
        public static News = "news";
        public static Photo = "photo";
        public static Video = "video";

        public static Admin = "admin";
        public static EditNews = "edit-news/:key";
        public static Turnament = "turnament";
        public static TuningTurnament = "tuning-turnament/:key/:type";

        public static PlanOpp = "plan/:key/:bt/:userId/:oppId";
        public static Checkerboard = "checkerboard/:key/:type/:bt";
        public static CheckerboardLead = "checkerboard/:key/:type/:bt/:leadId";
        public static CheckerboardOpp = "checkerboard/:key/:type/:bt/:oppId";
        public static CheckerDetail = "checkerDetail/:key/:type/:bt";

        public static Slash = "/";
        public static Any = '**';
    }
}