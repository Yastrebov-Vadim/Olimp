"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var page_1 = require("../../../services/page");
var turnament_1 = require("../../../services/admin/turnament");
var ElementRequest_1 = require("../../../classes/admin/requests/ElementRequest");
var common_1 = require("../../../model/user/common");
var Turnament = (function () {
    function Turnament(toastr, pageService, turnamentService, router, http) {
        this.toastr = toastr;
        this.pageService = pageService;
        this.turnamentService = turnamentService;
        this.router = router;
        this.http = http;
        this.idTurnament = null;
        this.index = null;
        var self = this;
    }
    Turnament.prototype.ngOnInit = function () {
        var self = this;
        self.pageService.recipeSelected.emit(9);
        self.getTurnamentInfo();
    };
    Turnament.prototype.getTurnamentInfo = function () {
        var self = this;
        self.busy = self.turnamentService.GetTurnamentInfo().then(function (response) {
            self.turnaments = response.turnaments;
        });
    };
    Turnament.prototype.addTurnament = function (isType, type) {
        var self = this;
        if (!isType) {
            self.toastr.error("Не выбран тип турнира");
            return;
        }
        self.busy = self.turnamentService.AddTurnament(new ElementRequest_1.ElementRequest(type)).then(function (response) {
            self.router.navigate([common_1.Common.RoutePaths.Admin + common_1.Common.RoutePaths.Slash + common_1.Common.RoutePaths.TuningTurnament], {
                queryParams: {
                    key: response.txt
                }
            });
        });
    };
    Turnament.prototype.selectTurnament = function (id, i) {
        var self = this;
        self.idTurnament = id;
        self.index = i;
    };
    Turnament.prototype.dellTurnament = function () {
        var self = this;
        if (self.idTurnament == null && self.index == null)
            return;
        self.busy = self.turnamentService.DellTurnament(new ElementRequest_1.ElementRequest(self.idTurnament)).then(function (response) {
            self.turnaments.splice(self.index, 1);
            self.idTurnament = null;
            self.index = null;
            self.toastr.success("Турнир удален");
        });
    };
    Turnament.prototype.editTurnament = function (id) {
        var self = this;
        self.router.navigate([common_1.Common.RoutePaths.Admin + common_1.Common.RoutePaths.Slash + common_1.Common.RoutePaths.TuningTurnament], {
            queryParams: {
                key: id
            }
        });
    };
    Turnament = __decorate([
        core_1.Component({
            selector: 'turnament',
            templateUrl: './turnament.html'
        }),
        __metadata("design:paramtypes", [ng2_toastr_1.ToastsManager,
            page_1.PageService,
            turnament_1.TurnamentAdminService,
            router_1.Router,
            http_1.Http])
    ], Turnament);
    return Turnament;
}());
exports.Turnament = Turnament;
//# sourceMappingURL=turnament.js.map