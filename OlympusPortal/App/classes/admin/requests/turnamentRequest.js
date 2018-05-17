"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SaveTurnamentInfoRequest = (function () {
    function SaveTurnamentInfoRequest(turnament) {
        this.turnament = turnament;
    }
    return SaveTurnamentInfoRequest;
}());
exports.SaveTurnamentInfoRequest = SaveTurnamentInfoRequest;
var TurnamentStepRequest = (function () {
    function TurnamentStepRequest(id, step) {
        this.id = id;
        this.step = step;
    }
    return TurnamentStepRequest;
}());
exports.TurnamentStepRequest = TurnamentStepRequest;
var TourStepRequest = (function () {
    function TourStepRequest(turnamentId, tour, step) {
        this.turnamentId = turnamentId;
        this.tour = tour;
        this.step = step;
    }
    return TourStepRequest;
}());
exports.TourStepRequest = TourStepRequest;
var DeclareRequest = (function () {
    function DeclareRequest(turnamentId, commandId) {
        this.turnamentId = turnamentId;
        this.commandId = commandId;
    }
    return DeclareRequest;
}());
exports.DeclareRequest = DeclareRequest;
var RemoveDeclareRequest = (function () {
    function RemoveDeclareRequest(turnamentId, commandId, cause) {
        this.turnamentId = turnamentId;
        this.commandId = commandId;
        this.cause = cause;
    }
    return RemoveDeclareRequest;
}());
exports.RemoveDeclareRequest = RemoveDeclareRequest;
var DivideForDayRequest = (function () {
    function DivideForDayRequest(turnamentId, tour, days) {
        this.turnamentId = turnamentId;
        this.tour = tour;
        this.days = days;
    }
    return DivideForDayRequest;
}());
exports.DivideForDayRequest = DivideForDayRequest;
var ChangeGameDayRequest = (function () {
    function ChangeGameDayRequest(turnamentId, startDate, newStartDate, arena, tour) {
        this.turnamentId = turnamentId;
        this.startDate = startDate;
        this.newStartDate = newStartDate;
        this.arena = arena;
        this.tour = tour;
    }
    return ChangeGameDayRequest;
}());
exports.ChangeGameDayRequest = ChangeGameDayRequest;
var CompleteGameRequest = (function () {
    function CompleteGameRequest(turnamentId, gameId, commandOneGoals, commandTwoGoals) {
        this.turnamentId = turnamentId;
        this.gameId = gameId;
        this.commandOneGoals = commandOneGoals;
        this.commandTwoGoals = commandTwoGoals;
    }
    return CompleteGameRequest;
}());
exports.CompleteGameRequest = CompleteGameRequest;
//# sourceMappingURL=turnamentRequest.js.map