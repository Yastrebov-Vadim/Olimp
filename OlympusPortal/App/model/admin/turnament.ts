import { CommandForTurnament } from '../../model/user/command';

export class TurnamentInfo {
    public id: string;
    public name: string;
    public dateStart: Date;
    public dateEnd: Date;
    public type: number;
    public stateCode: boolean;
    public step: number;

    constructor(id: string, name: string, dateStart: Date, dateEnd: Date, type: number, stateCode: boolean, step: number) {
        this.id = id;
        this.name = name;
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
        this.type = type;
        this.stateCode = stateCode;
        this.step = step;
    }
}

export class GetTurnament {
    public id: string;
    public name: string;
    public dateStart: Date;
    public dateEnd: Date;
    public type: number;
    public stateCode: boolean;
    public step: number;
    public description: string;
    public contributionGame: number;
    public contributionTournament: number;
    public commands: CommandForTurnament[];
    public positionCommand: PositionCommand[];
    public groupTourNumber: GroupTourNumber[];

    constructor(id: string, name: string, dateStart: Date, dateEnd: Date, type: number,
        stateCode: boolean, step: number, description: string, contributionGame: number,
        contributionTournament: number, commands: CommandForTurnament[], positionCommand: PositionCommand[],
        groupTourNumber: GroupTourNumber[]) {
        this.id = id;
        this.name = name;
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
        this.type = type;
        this.stateCode = stateCode;
        this.step = step;
        this.description = description;
        this.contributionGame = contributionGame;
        this.contributionTournament = contributionTournament;
        this.commands = commands;
        this.positionCommand = positionCommand;
        this.groupTourNumber = groupTourNumber;
    }
}

export class PositionCommand {
    public id: string;
    public position: number;
    public commandId: string;
    public commandName: string;
    public points: number;
    public place: number;

    constructor(id: string, position: number, commandId: string, commandName: string, points: number, place: number) {
        this.id = id;
        this.position = position;
        this.commandId = commandId;
        this.commandName = commandName;
        this.points = points;
        this.place = place;
    }
}

export class GameTurnament {
    public id: string;
    public idCommandOne: string;
    public idCommandTwo: string;
    public commandOneName: string;
    public commandTwoName: string;
    public tour: number;
    public status: number;
    public dateStart: Date;
    public arena: string;
    public commandOneGoals: number;
    public commandTwoGoals: number;
    public commandOnePoints: number;
    public commandTwoPoints: number;

    constructor(id: string, idCommandOne: string, idCommandTwo: string, commandOneName: string, commandTwoName: string,
        tour: number, status: number, dateStart: Date, arena: string, commandOneGoals: number, commandTwoGoals: number,
        commandOnePoints: number, commandTwoPoints: number) {
        this.id = id;
        this.idCommandOne = idCommandOne;
        this.idCommandTwo = idCommandTwo;
        this.commandOneName = commandOneName;
        this.commandTwoName = commandTwoName;
        this.tour = tour;
        this.status = status;
        this.dateStart = dateStart;
        this.arena = arena;
        this.commandOneGoals = commandOneGoals;
        this.commandTwoGoals = commandTwoGoals;
        this.commandOnePoints = commandOnePoints;
        this.commandTwoPoints = commandTwoPoints;
    }
}

export class GroupDateStart {
    public dateStart: string;
    public arena: string;
    public gameTurnament: GameTurnament[];

    constructor(dateStart: string, arena: string, gameTurnament: GameTurnament[]) {
        this.dateStart = dateStart;
        this.arena = arena;
        this.gameTurnament = gameTurnament;
    }
}

export class GroupTourNumber {
    public numberTour: number;
    public status: number;
    public groupDateStart: GroupDateStart[];

    constructor(numberTour: number, status: number, groupDateStart: GroupDateStart[]) {
        this.numberTour = numberTour;
        this.status = status;
        this.groupDateStart = groupDateStart;
    }
}

export class DayGame {
    public day: Date;
    public arena: string;
    constructor(day: Date, arena: string) {
        this.day = day;
        this.arena = arena;
    }
}

export class Arena {
    public id: string;
    public name: string;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }
}