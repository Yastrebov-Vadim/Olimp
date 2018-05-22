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
var GetCircleTurnament = (function () {
    function GetCircleTurnament(id, name, dateStart, dateEnd, type, stateCode, step, description, contributionGame, contributionTournament, commands, positionCommand, groupTourNumber) {
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
        this.groupTourNumber = groupTourNumber;
    }
    return GetCircleTurnament;
}());
exports.GetCircleTurnament = GetCircleTurnament;
var GetMixedTurnament = (function () {
    function GetMixedTurnament(id, name, dateStart, dateEnd, type, stateCode, step, description, contributionGame, contributionTournament, commands, turnamentGroups) {
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
        this.turnamentGroups = turnamentGroups;
    }
    return GetMixedTurnament;
}());
exports.GetMixedTurnament = GetMixedTurnament;
var TurnamentGroups = (function () {
    function TurnamentGroups(groupId, positionCommand, groupTourNumber) {
        this.groupId = groupId;
        this.positionCommand = positionCommand;
        this.groupTourNumber = groupTourNumber;
    }
    return TurnamentGroups;
}());
exports.TurnamentGroups = TurnamentGroups;
var Table = (function () {
    function Table(rowSize, colSize, table) {
        this.rowSize = rowSize;
        this.colSize = colSize;
        this.table = table;
    }
    return Table;
}());
exports.Table = Table;
var PositionCommand = (function () {
    function PositionCommand(id, position, commandId, commandName, points, place, fakeCode) {
        this.id = id;
        this.position = position;
        this.commandId = commandId;
        this.commandName = commandName;
        this.points = points;
        this.place = place;
        this.fakeCode = fakeCode;
    }
    return PositionCommand;
}());
exports.PositionCommand = PositionCommand;
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
var GroupDateStart = (function () {
    function GroupDateStart(dateStart, arena, gameTurnament) {
        this.dateStart = dateStart;
        this.arena = arena;
        this.gameTurnament = gameTurnament;
    }
    return GroupDateStart;
}());
exports.GroupDateStart = GroupDateStart;
var GroupTourNumber = (function () {
    function GroupTourNumber(numberTour, status, groupDateStart) {
        this.numberTour = numberTour;
        this.status = status;
        this.groupDateStart = groupDateStart;
    }
    return GroupTourNumber;
}());
exports.GroupTourNumber = GroupTourNumber;
var DayGame = (function () {
    function DayGame(day, arena) {
        this.day = day;
        this.arena = arena;
    }
    return DayGame;
}());
exports.DayGame = DayGame;
var Arena = (function () {
    function Arena(id, name) {
        this.id = id;
        this.name = name;
    }
    return Arena;
}());
exports.Arena = Arena;
var Cell = (function () {
    function Cell(value, isFake) {
        this.value = value;
        this.isFake = isFake;
    }
    return Cell;
}());
exports.Cell = Cell;
//# sourceMappingURL=turnament.js.map