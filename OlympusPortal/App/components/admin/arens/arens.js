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
var page_1 = require("../../../services/page");
var turnament_1 = require("../../../services/admin/turnament");
var turnament_2 = require("../../../model/admin/turnament");
var elementRequest_1 = require("../../../classes/admin/requests/elementRequest");
var ArensAdmin = (function () {
    function ArensAdmin(toastr, pageService, turnamentService) {
        this.toastr = toastr;
        this.pageService = pageService;
        this.turnamentService = turnamentService;
        var self = this;
    }
    ArensAdmin.prototype.ngOnInit = function () {
        var self = this;
        self.pageService.recipeSelected.emit(10);
        self.getArens();
    };
    ArensAdmin.prototype.getArens = function () {
        var self = this;
        self.busy = self.turnamentService.GetArena().then(function (response) {
            self.arens = response.arens;
        });
    };
    ArensAdmin.prototype.addArenaBlockStyle = function () {
        var self = this;
        var top = (window.outerHeight - 500) / 2;
        return {
            "margin-top": top + "px"
        };
    };
    ArensAdmin.prototype.close = function () {
        document.getElementById("transparent-layer-arena").style.display = "none";
    };
    ArensAdmin.prototype.openFormAddArena = function () {
        var self = this;
        document.getElementById("transparent-layer-arena").style.display = "block";
    };
    ArensAdmin.prototype.addArena = function (isValid) {
        var self = this;
        if (isValid) {
            self.toastr.error("Все поля должны быть заполнены");
            return;
        }
        self.busy = self.turnamentService.AddArena(new elementRequest_1.ElementRequest(self.arenaName)).then(function (response) {
            self.arens.push(new turnament_2.Arena(response.txt, self.arenaName));
            self.arenaName = null;
            self.close();
            self.toastr.success("Арена добавлен в систему");
        });
    };
    ArensAdmin.prototype.selectArena = function (arenaId, index) {
        var self = this;
        self.arenaId = arenaId;
        self.index = index;
    };
    ArensAdmin.prototype.dellArena = function () {
        var self = this;
        if (self.arenaId == null || self.index == null)
            return;
        self.busy = self.turnamentService.DellArena(new elementRequest_1.ElementRequest(self.arenaId)).then(function (response) {
            self.arens.splice(self.index, 1);
            self.arenaId = null;
            self.index = null;
            self.toastr.success("Арена удалена");
        });
    };
    ArensAdmin = __decorate([
        core_1.Component({
            selector: 'arens-admin',
            templateUrl: './arens.html'
        }),
        __metadata("design:paramtypes", [ng2_toastr_1.ToastsManager,
            page_1.PageService,
            turnament_1.TurnamentAdminService])
    ], ArensAdmin);
    return ArensAdmin;
}());
exports.ArensAdmin = ArensAdmin;
//# sourceMappingURL=arens.js.map