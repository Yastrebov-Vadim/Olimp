"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GetTurnamentForUser = (function () {
    function GetTurnamentForUser(id, name, dateStart, dateEnd, description, contributionGame, contributionTournament, commands) {
        this.id = id;
        this.name = name;
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
        this.description = description;
        this.contributionGame = contributionGame;
        this.contributionTournament = contributionTournament;
        this.commands = commands;
    }
    return GetTurnamentForUser;
}());
exports.GetTurnamentForUser = GetTurnamentForUser;
//# sourceMappingURL=turnament.js.map