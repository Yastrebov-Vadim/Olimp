import { GetTurnament } from '../../../model/admin/turnament';
export class SaveTurnamentInfoRequest {
    turnament: GetTurnament

    constructor(turnament: GetTurnament) {
        this.turnament = turnament;
    }
}

export class TurnamentStepRequest {
    id: string
    step: number

    constructor(id: string, step: number) {
        this.id = id;
        this.step = step;
    }
}

export class DeclareRequest {
    turnamentId: string
    commandId: string

    constructor(turnamentId: string, commandId: string) {
        this.turnamentId = turnamentId;
        this.commandId = commandId;
    }
}

export class RemoveDeclareRequest {
    turnamentId: string
    commandId: string
    cause: string

    constructor(turnamentId: string, commandId: string, cause: string) {
        this.turnamentId = turnamentId;
        this.commandId = commandId;
        this.cause = cause;
    }
}