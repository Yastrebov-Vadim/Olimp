import { TurnamentInfo, GetTurnament, Arena } from '../../../model/admin/turnament';

export class TurnamentInfoResponse {
    turnaments: TurnamentInfo[]

    constructor(turnaments: TurnamentInfo[]) {
        this.turnaments = turnaments
    }
}

export class GetTurnamentResponse {
    turnament: GetTurnament

    constructor(turnament: GetTurnament) {
        this.turnament = turnament
    }
}

export class GetArenaResponse {
    arens: Arena[]

    constructor(arens: Arena[]) {
        this.arens = arens
    }
}