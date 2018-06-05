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
require("rxjs/Rx");
var transport_1 = require("../transport");
var urls_1 = require("../../classes/urls");
var TurnamentAdminService = (function () {
    function TurnamentAdminService(tranport) {
        this.tranport = tranport;
        this.urls = new urls_1.Urls();
    }
    TurnamentAdminService.prototype.GetTurnamentInfo = function () {
        var self = this;
        return this.tranport.postData(self.urls.getTurnamentInfo, null);
    };
    TurnamentAdminService.prototype.AddTurnament = function (request) {
        var self = this;
        return this.tranport.postData(self.urls.addTurnament, request);
    };
    TurnamentAdminService.prototype.DellTurnament = function (request) {
        var self = this;
        return this.tranport.postData(self.urls.dellTurnament, request);
    };
    TurnamentAdminService.prototype.GetTurnamentCircle = function (request) {
        var self = this;
        return this.tranport.postData(self.urls.getTurnamentCircle, request);
    };
    TurnamentAdminService.prototype.GetTurnamentMixed = function (request) {
        var self = this;
        return this.tranport.postData(self.urls.getTurnamentMixed, request);
    };
    TurnamentAdminService.prototype.GetPlayerForTurnament = function (request) {
        var self = this;
        return this.tranport.postData(self.urls.getPlayerForTurnament, request);
    };
    TurnamentAdminService.prototype.SaveCircleTurnamentInfo = function (request) {
        var self = this;
        return this.tranport.postData(self.urls.saveTurnamentInfo, request);
    };
    TurnamentAdminService.prototype.SaveMixedTurnamentInfo = function (request) {
        var self = this;
        return this.tranport.postData(self.urls.saveTurnamentInfo, request);
    };
    TurnamentAdminService.prototype.ChangeStep = function (request) {
        var self = this;
        return this.tranport.postData(self.urls.changeStep, request);
    };
    TurnamentAdminService.prototype.ChangeArena = function (request) {
        var self = this;
        return this.tranport.postData(self.urls.changeArena, request);
    };
    TurnamentAdminService.prototype.ChangeDate = function (request) {
        var self = this;
        return this.tranport.postData(self.urls.changeDate, request);
    };
    TurnamentAdminService.prototype.AcceptDeclare = function (request) {
        var self = this;
        return this.tranport.postData(self.urls.acceptDeclare, request);
    };
    TurnamentAdminService.prototype.RemoveDeclare = function (request) {
        var self = this;
        return this.tranport.postData(self.urls.removeDeclare, request);
    };
    TurnamentAdminService.prototype.CalculateTable = function (request) {
        var self = this;
        return this.tranport.postData(self.urls.calculateTable, request);
    };
    TurnamentAdminService.prototype.CalculateGroup = function (request) {
        var self = this;
        return this.tranport.postData(self.urls.calculateGroup, request);
    };
    TurnamentAdminService.prototype.CalculatePlayOff = function (request) {
        var self = this;
        return this.tranport.postData(self.urls.calculatePlayOff, request);
    };
    TurnamentAdminService.prototype.DivideForDay = function (request) {
        var self = this;
        return this.tranport.postData(self.urls.divideForDay, request);
    };
    TurnamentAdminService.prototype.GetArena = function () {
        var self = this;
        return this.tranport.postData(self.urls.getArena, null);
    };
    TurnamentAdminService.prototype.ChangeStatusTour = function (request) {
        var self = this;
        return this.tranport.postData(self.urls.changeStatusTour, request);
    };
    TurnamentAdminService.prototype.CompleteGame = function (request) {
        var self = this;
        return this.tranport.postData(self.urls.completeGame, request);
    };
    TurnamentAdminService.prototype.CloseTour = function (request) {
        var self = this;
        return this.tranport.postData(self.urls.closeTour, request);
    };
    TurnamentAdminService.prototype.AddGoals = function (request) {
        var self = this;
        return this.tranport.postData(self.urls.addGoals, request);
    };
    TurnamentAdminService.prototype.AddCard = function (request) {
        var self = this;
        return this.tranport.postData(self.urls.addCard, request);
    };
    TurnamentAdminService.prototype.AddArena = function (request) {
        var self = this;
        return this.tranport.postData(self.urls.addArena, request);
    };
    TurnamentAdminService.prototype.DellArena = function (request) {
        var self = this;
        return this.tranport.postData(self.urls.dellArena, request);
    };
    TurnamentAdminService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [transport_1.TransportService])
    ], TurnamentAdminService);
    return TurnamentAdminService;
}());
exports.TurnamentAdminService = TurnamentAdminService;
//# sourceMappingURL=turnament.js.map