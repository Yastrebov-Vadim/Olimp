"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GetTurnamentForUser = (function () {
    function GetTurnamentForUser(id, name, dateStart, dateEnd, description, contributionGame, contributionTournament, type, commands, positionCommand, groupTourNumber, turnamentGroups) {
        this.id = id;
        this.name = name;
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
        this.description = description;
        this.contributionGame = contributionGame;
        this.contributionTournament = contributionTournament;
        this.type = type;
        this.commands = commands;
        this.positionCommand = positionCommand;
        this.groupTourNumber = groupTourNumber;
        this.turnamentGroups = turnamentGroups;
    }
    return GetTurnamentForUser;
}());
exports.GetTurnamentForUser = GetTurnamentForUser;
var TurnamentGroups = (function () {
    function TurnamentGroups(positionCommand, groupTourNumber) {
        this.positionCommand = positionCommand;
        this.groupTourNumber = groupTourNumber;
    }
    return TurnamentGroups;
}());
exports.TurnamentGroups = TurnamentGroups;
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
var GroupTourNumber = (function () {
    function GroupTourNumber(numberTour, status, groupDateStart) {
        this.numberTour = numberTour;
        this.status = status;
        this.groupDateStart = groupDateStart;
    }
    return GroupTourNumber;
}());
exports.GroupTourNumber = GroupTourNumber;
var GroupDateStart = (function () {
    function GroupDateStart(dateStart, arena, gameTurnament) {
        this.dateStart = dateStart;
        this.arena = arena;
        this.gameTurnament = gameTurnament;
    }
    return GroupDateStart;
}());
exports.GroupDateStart = GroupDateStart;
var GameTurnament = (function () {
    function GameTurnament(id, idCommandOne, idCommandTwo, commandOneName, commandTwoName, tour, status, dateStart, arena, commandOneGoals, commandTwoGoals, commandOnePoints, commandTwoPoints) {
        this.id = id;
        this.idCommandOne = idCommandOne;
        this.idCommandTwo = idCommandTwo;
        this.commandOneName = commandOneName;
        this.commandTwoName = commandTwoName;
        this.tour = tour;
        this.status = status;
        this.dateStart = dateStart;
        this.arena = arena;
        this.commandOneGoals = commandOneGoals;
        this.commandTwoGoals = commandTwoGoals;
        this.commandOnePoints = commandOnePoints;
        this.commandTwoPoints = commandTwoPoints;
    }
    return GameTurnament;
}());
exports.GameTurnament = GameTurnament;
var Table = (function () {
    function Table(rowSize, colSize, table) {
        this.rowSize = rowSize;
        this.colSize = colSize;
        this.table = table;
    }
    return Table;
}());
exports.Table = Table;
//# sourceMappingURL=turnament.js.map