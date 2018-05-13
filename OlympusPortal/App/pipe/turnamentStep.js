"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var TurnamentStep = (function () {
    function TurnamentStep() {
    }
    TurnamentStep.prototype.transform = function (value, args) {
        if (value == 0)
            return "Редактирование";
        if (value == 1)
            return "Регистрация";
        if (value == 2)
            return "Построение";
        if (value == 3)
            return "В процессе";
        if (value == 4)
            return "Завершен";
    };
    TurnamentStep = __decorate([
        core_1.Pipe({
            name: 'turnamentStep'
        })
    ], TurnamentStep);
    return TurnamentStep;
}());
exports.TurnamentStep = TurnamentStep;
//# sourceMappingURL=turnamentStep.js.map