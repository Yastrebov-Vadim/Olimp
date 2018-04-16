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
var http_1 = require("@angular/http");
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
require("rxjs/add/operator/toPromise");
var TransportService = (function () {
    function TransportService(http, toastr) {
        this.http = http;
        this.toastr = toastr;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    TransportService.prototype.postData = function (url, data) {
        var self = this;
        var options = new http_1.RequestOptions({ headers: self.headers });
        return self.http.post(url, data, options)
            .toPromise()
            .then(self.extractData)
            .catch(function (error) { return self.handleError(error, self); });
    };
    TransportService.prototype.extractData = function (response) {
        return response.json() || {};
    };
    TransportService.prototype.handleError = function (error, self) {
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            errMsg = body.Message || JSON.stringify(body);
            if (error.statusText == "Unauthorized")
                errMsg = "Необходимо авторизоваться. Возпользуйтесть кнопкой \"Войти\"";
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        self.toastr.error(errMsg);
        return Promise.reject(errMsg);
    };
    TransportService.prototype.postDataImg = function (url, data) {
        var self = this;
        return self.http.post(url, data)
            .toPromise()
            .then(self.extractData)
            .catch(function (error) { return self.handleError(error, self); });
    };
    TransportService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http,
            ng2_toastr_1.ToastsManager])
    ], TransportService);
    return TransportService;
}());
exports.TransportService = TransportService;
//# sourceMappingURL=transport.js.map