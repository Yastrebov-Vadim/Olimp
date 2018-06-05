import { CommandForTurnament } from '../../model/user/command';

export class GetTurnamentForUser {
    public id: string;
    public name: string;
    public dateStart: Date;
    public dateEnd: Date;
    public description: string;
    public contributionGame: number;
    public contributionTournament: number;
    public type: number;
    public commands: CommandForTurnament[];
    public positionCommand: PositionCommand[];
    public groupTourNumber: GroupTourNumber[];
    public turnamentGroups: TurnamentGroups[];
    public turnamentPlayOff: TurnamentPlayOff[];
    public positionPlayOff: PositionCommand[][]
    public tableTutnament: Table;
    public isOlayOff: boolean;
    
    constructor(id: string, name: string, dateStart: Date, dateEnd: Date, description: string, contributionGame: number,
        contributionTournament: number, type: number, commands: CommandForTurnament[], positionCommand: PositionCommand[],
        groupTourNumber: GroupTourNumber[], turnamentGroups: TurnamentGroups[], turnamentPlayOff: TurnamentPlayOff[],
        positionPlayOff: PositionCommand[][]) {
        this.id = id;
        this.name = name;
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
        this.description = description;
        this.contributionGame = contributionGame;
        this.contributionTournament = contributionTournament;
        this.type = type;
        this.commands = commands;
        this.positionCommand = positionCommand;
        this.groupTourNumber = groupTourNumber;
        this.turnamentGroups = turnamentGroups;
        this.turnamentPlayOff = turnamentPlayOff;
        this.positionPlayOff = positionPlayOff;
    }
}

export class TurnamentPlayOff {
    public playOffId: string;
    public numberCircle: number;
    public stateCode: boolean;
    public groupTourNumber: GroupTourNumber[];

    constructor(playOffId: string, numberCircle: number, stateCode: boolean, groupTourNumber: GroupTourNumber[]) {
        this.playOffId = playOffId;
        this.numberCircle = numberCircle;
        this.stateCode = stateCode;
        this.groupTourNumber = groupTourNumber;
    }
}

export class TurnamentGroups {
    public positionCommand: PositionCommand[];
    public groupTourNumber: GroupTourNumber[];
    public tableTutnament: Table;

    constructor(positionCommand: PositionCommand[], groupTourNumber: GroupTourNumber[]) {
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
    public commandOneGoals: Goals;
    public commandTwoGoals: Goals;
    public commandOnePoints: number;
    public commandTwoPoints: number;

    constructor(id: string, idCommandOne: string, idCommandTwo: string, commandOneName: string, commandTwoName: string,
        tour: number, status: number, dateStart: Date, arena: string, commandOneGoals: Goals, commandTwoGoals: Goals,
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

export class Table {
    public rowSize: Array<number>;
    public colSize: Array<number>;
    public table: Array<number>;

    constructor(rowSize: Array<number>, colSize: Array<number>, table: Array<number>) {
        this.rowSize = rowSize;
        this.colSize = colSize;
        this.table = table;
    }
}


export class Goals {
    public value: number;
    public goal: Goal[];

    constructor(value: number, goal: Goal[]) {
        this.value = value;
        this.goal = goal;
    }
}

export class Goal {
    public id: string;
    public turnamentId: string;
    public commandId: string;
    public gameId: string;
    public playerId: string;
    public playerSurname: string;
    public time: number;

    constructor(id: string, turnamentId: string, commandId: string, gameId: string, playerId: string, playerSurname: string, time: number) {
        this.id = id;
        this.turnamentId = turnamentId;
        this.commandId = commandId;
        this.gameId = gameId;
        this.playerId = playerId;
        this.playerSurname = playerSurname;
        this.time = time;
    }
}