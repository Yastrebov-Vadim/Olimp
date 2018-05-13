import { TurnamentInfo, GetTurnament } from '../../../model/admin/turnament';

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