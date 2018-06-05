import { GetCircleTurnament,GetMixedTurnament, DayGame, Goal, Card } from '../../../model/admin/turnament';
export class SaveCircleTurnamentInfoRequest {
    turnament: GetCircleTurnament

    constructor(turnament: GetCircleTurnament) {
        this.turnament = turnament;
    }
}

export class SaveMixedTurnamentInfoRequest {
    turnament: GetMixedTurnament

    constructor(turnament: GetMixedTurnament) {
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

export class TourStepRequest {
    turnamentId: string
    circleId: string
    turnamentType: number
    tour: number
    step: number

    constructor(turnamentId: string, circleId: string, turnamentType: number, tour: number, step: number) {
        this.turnamentId = turnamentId;
        this.circleId = circleId;
        this.turnamentType = turnamentType;
        this.tour = tour;
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

export class DivideForDayRequest {
    turnamentId: string
    tour: number
    days: DayGame[]

    constructor(turnamentId: string, tour: number, days: DayGame[]) {
        this.turnamentId = turnamentId;
        this.tour = tour;
        this.days = days;
    }
}

export class ChangeGameDayRequest {
    turnamentId: string;
    startDate: Date;
    newStartDate: Date;
    arena: string;
    tour: number;
    
    constructor(turnamentId: string, startDate: Date, newStartDate: Date, arena: string, tour: number) {
        this.turnamentId = turnamentId
        this.startDate = startDate
        this.newStartDate = newStartDate
        this.arena = arena
        this.tour = tour
    }
}

export class CompleteGameRequest {
    turnamentId: string;
    gameId: string;
    commandOneGoals: number;
    commandTwoGoals: number;

    constructor(turnamentId: string, gameId: string, commandOneGoals: number, commandTwoGoals: number) {
        this.turnamentId = turnamentId;
        this.gameId = gameId;
        this.commandOneGoals = commandOneGoals;
        this.commandTwoGoals = commandTwoGoals;
    }
}

export class CalculateGroupRequest {
    turnamentId: string;
    groupCount: number;

    constructor(turnamentId: string, groupCount: number) {
        this.turnamentId = turnamentId;
        this.groupCount = groupCount;
    }
}

export class AddGoalRequest {
    goal: Goal;

    constructor(goal: Goal) {
        this.goal = goal;
    }
}

export class AddCardRequest {
    card: Card;

    constructor(card: Card) {
        this.card = card;
    }
}