"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TurnamentInfo = (function () {
    function TurnamentInfo(id, name, dateStart, dateEnd, type, stateCode, step) {
        this.id = id;
        this.name = name;
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
        this.type = type;
        this.stateCode = stateCode;
        this.step = step;
    }
    return TurnamentInfo;
}());
exports.TurnamentInfo = TurnamentInfo;
var GetTurnament = (function () {
    function GetTurnament(id, name, dateStart, dateEnd, type, stateCode, step, description, contributionGame, contributionTournament, commands, positionCommand, gameTurnament) {
        this.id = id;
        this.name = name;
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
        this.type = type;
        this.stateCode = stateCode;
        this.step = step;
        this.description = description;
        this.contributionGame = contributionGame;
        this.contributionTournament = contributionTournament;
        this.commands = commands;
        this.positionCommand = positionCommand;
        this.gameTurnament = gameTurnament;
    }
    return GetTurnament;
}());
exports.GetTurnament = GetTurnament;
var PositionCommand = (function () {
    function PositionCommand(id, position, commandId, commandName, points, place) {
        this.id = id;
        this.position = position;
        this.commandId = commandId;
        this.commandName = commandName;
        this.points = points;
        this.place = place;
    }
    return PositionCommand;
}());
exports.PositionCommand = PositionCommand;
var GameTurnament = (function () {
    function GameTurnament(id, idCommandOne, idCommandTwo, tour, dateStart, commandOneGoals, commandTwoGoals, commandOnePoints, commandTwoPoints) {
        if (dateStart === void 0) { dateStart = null; }
        this.id = id;
        this.idCommandOne = idCommandOne;
        this.idCommandTwo = idCommandTwo;
        this.commandOneGoals = commandOneGoals;
        this.commandTwoGoals = commandTwoGoals;
        this.commandOnePoints = commandOnePoints;
        this.commandTwoPoints = commandTwoPoints;
    }
    return GameTurnament;
}());
exports.GameTurnament = GameTurnament;
//# sourceMappingURL=turnament.js.map