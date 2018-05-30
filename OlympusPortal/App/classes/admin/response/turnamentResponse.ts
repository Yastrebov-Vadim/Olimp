import { TurnamentInfo, GetCircleTurnament, GetMixedTurnament, Arena, Player } from '../../../model/admin/turnament';

export class TurnamentInfoResponse {
    turnaments: TurnamentInfo[]

    constructor(turnaments: TurnamentInfo[]) {
        this.turnaments = turnaments
    }
}

export class GetCircleTurnamentResponse {
    turnament: GetCircleTurnament

    constructor(turnament: GetCircleTurnament) {
        this.turnament = turnament
    }
}

export class GetMixedTurnamentResponse {
    turnament: GetMixedTurnament

    constructor(turnament: GetMixedTurnament) {
        this.turnament = turnament
    }
}

export class GetPlayerForTurnamentResponse {
    players: Player[]

    constructor(players: Player[]) {
        this.players = players
    }
}

export class GetArenaResponse {
    arens: Arena[]

    constructor(arens: Arena[]) {
        this.arens = arens
    }
}