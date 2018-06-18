import { GetTurnamentForUser, StatisticsCommand } from '../../../model/user/turnament';

export class GetTurnamentForUserResponse {
    turnaments: GetTurnamentForUser[]

    constructor(turnaments: GetTurnamentForUser[]) {
        this.turnaments = turnaments
    }
}

export class StatisticsCommandResponse {
    statisticsCommand: StatisticsCommand

    constructor(statisticsCommand: StatisticsCommand) {
        this.statisticsCommand = statisticsCommand
    }
}