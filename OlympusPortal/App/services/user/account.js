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
var AccountService = (function () {
    function AccountService(tranport) {
        this.tranport = tranport;
        this.urls = new urls_1.Urls();
    }
    AccountService.prototype.GetAccount = function () {
        var self = this;
        return this.tranport.postData(self.urls.getAccount, null);
    };
    AccountService.prototype.AddPlayer = function (request) {
        var self = this;
        return this.tranport.postData(self.urls.addPlayer, request);
    };
    AccountService.prototype.DellPlayer = function (request) {
        var self = this;
        return this.tranport.postData(self.urls.dellPlayer, request);
    };
    AccountService.prototype.EditAccountInfo = function (request) {
        var self = this;
        return this.tranport.postData(self.urls.editAccountInfo, request);
    };
    AccountService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [transport_1.TransportService])
    ], AccountService);
    return AccountService;
}());
exports.AccountService = AccountService;
//# sourceMappingURL=account.js.map