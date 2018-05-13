import { GetTurnamentForUser } from '../../../model/user/turnament';

export class GetTurnamentForUserResponse {
    turnaments: GetTurnamentForUser[]

    constructor(turnaments: GetTurnamentForUser[]) {
        this.turnaments = turnaments
    }
}