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
//# sourceMappingURL=turnamentRequest.js.map