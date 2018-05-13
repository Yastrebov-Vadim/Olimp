"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Command = (function () {
    function Command(photo, name, phone, email, command) {
        this.photo = photo;
        this.name = name;
        this.command = command;
    }
    return Command;
}());
exports.Command = Command;
var CommandFilter = (function () {
    function CommandFilter(name, id) {
        this.name = name;
        this.id = id;
    }
    return CommandFilter;
}());
exports.CommandFilter = CommandFilter;
var CommandsId = (function () {
    function CommandsId(id) {
        this.id = id;
    }
    return CommandsId;
}());
exports.CommandsId = CommandsId;
var CommandForTurnament = (function () {
    function CommandForTurnament(id, name, status) {
        this.id = id;
        this.name = name;
        this.status = status;
    }
    return CommandForTurnament;
}());
exports.CommandForTurnament = CommandForTurnament;
//# sourceMappingURL=command.js.map