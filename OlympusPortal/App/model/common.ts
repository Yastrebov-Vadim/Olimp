import { Route } from '@angular/router';
export module Common {
    export class NavigationState {
        public route: Route;
        public title: string;
        public backButton: string;
        public queryParams: any;

        public previousState: NavigationState;

        constructor(route: Route, backButton: string, queryParams: any, previousState: NavigationState, title: string = null) {
            this.route = route;
            this.backButton = backButton;
            this.queryParams = queryParams;
            this.previousState = previousState;
            this.title = title;
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
        public static Foto = "foto";

        public static PlanOpp = "plan/:key/:bt/:userId/:oppId";
        public static Checkerboard = "checkerboard/:key/:type/:bt";
        public static CheckerboardLead = "checkerboard/:key/:type/:bt/:leadId";
        public static CheckerboardOpp = "checkerboard/:key/:type/:bt/:oppId";
        public static CheckerDetail = "checkerDetail/:key/:type/:bt";
        public static Any = '**';
    }

    export interface NavigationProtocol {
        overrideNavService: () => void;
    }
}