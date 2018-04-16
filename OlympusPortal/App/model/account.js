"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Account = (function () {
    function Account(foto, name, phone, email, command) {
        this.foto = foto;
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.command = command;
    }
    return Account;
}());
exports.Account = Account;
var Player = (function () {
    function Player(playerId, name, surname, middleName, number) {
        this.playerId = playerId;
        this.name = name;
        this.surname = surname;
        this.middleName = middleName;
        this.number = number;
    }
    return Player;
}());
exports.Player = Player;
//# sourceMappingURL=account.js.map