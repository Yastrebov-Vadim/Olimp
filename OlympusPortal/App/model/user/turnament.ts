import { CommandForTurnament } from '../../model/user/command';

export class GetTurnamentForUser {
    public id: string;
    public name: string;
    public dateStart: Date;
    public dateEnd: Date;
    public description: string;
    public contributionGame: number;
    public contributionTournament: number;
    public commands: CommandForTurnament[];
    
    constructor(id: string, name: string, dateStart: Date, dateEnd: Date, description: string, contributionGame: number, contributionTournament: number, commands: CommandForTurnament[]) {
        this.id = id;
        this.name = name;
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
        this.description = description;
        this.contributionGame = contributionGame;
        this.contributionTournament = contributionTournament;
        this.commands = commands;
    }
}