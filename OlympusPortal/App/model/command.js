"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Command = (function () {
    function Command(foto, name, phone, email, command) {
        this.foto = foto;
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
//# sourceMappingURL=command.js.map