"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SaveCircleTurnamentInfoRequest = (function () {
    function SaveCircleTurnamentInfoRequest(turnament) {
        this.turnament = turnament;
    }
    return SaveCircleTurnamentInfoRequest;
}());
exports.SaveCircleTurnamentInfoRequest = SaveCircleTurnamentInfoRequest;
var SaveMixedTurnamentInfoRequest = (function () {
    function SaveMixedTurnamentInfoRequest(turnament) {
        this.turnament = turnament;
    }
    return SaveMixedTurnamentInfoRequest;
}());
exports.SaveMixedTurnamentInfoRequest = SaveMixedTurnamentInfoRequest;
var TurnamentStepRequest = (function () {
    function TurnamentStepRequest(id, step) {
        this.id = id;
        this.step = step;
    }
    return TurnamentStepRequest;
}());
exports.TurnamentStepRequest = TurnamentStepRequest;
var TourStepRequest = (function () {
    function TourStepRequest(turnamentId, circleId, turnamentType, tour, step) {
        this.turnamentId = turnamentId;
        this.circleId = circleId;
        this.turnamentType = turnamentType;
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
var CalculateGroupRequest = (function () {
    function CalculateGroupRequest(turnamentId, groupCount) {
        this.turnamentId = turnamentId;
        this.groupCount = groupCount;
    }
    return CalculateGroupRequest;
}());
exports.CalculateGroupRequest = CalculateGroupRequest;
var AddGoalRequest = (function () {
    function AddGoalRequest(goal) {
        this.goal = goal;
    }
    return AddGoalRequest;
}());
exports.AddGoalRequest = AddGoalRequest;
var AddCardRequest = (function () {
    function AddCardRequest(card) {
        this.card = card;
    }
    return AddCardRequest;
}());
exports.AddCardRequest = AddCardRequest;
//# sourceMappingURL=turnamentRequest.js.map