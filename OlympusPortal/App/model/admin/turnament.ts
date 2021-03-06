﻿import { CommandForTurnament } from '../../model/user/command';

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

export class GetCircleTurnament {
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

export class GetMixedTurnament {
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
    public turnamentGroups: TurnamentGroups[];
    public turnamentPlayOff: TurnamentPlayOff[];
    public positionPlayOff: PositionCommand[][]

    constructor(id: string, name: string, dateStart: Date, dateEnd: Date, type: number,
        stateCode: boolean, step: number, description: string, contributionGame: number,
        contributionTournament: number, commands: CommandForTurnament[], turnamentGroups: TurnamentGroups[],
        turnamentPlayOff: TurnamentPlayOff[], positionPlayOff: PositionCommand[][]) {
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
        this.turnamentGroups = turnamentGroups;
        this.turnamentPlayOff = turnamentPlayOff;
        this.positionPlayOff = positionPlayOff;
    }
}

export class TurnamentGroups {
    public groupId: string;
    public positionCommand: PositionCommand[];
    public groupTourNumber: GroupTourNumber[];
    public tableTutnament: Table;

    constructor(groupId: string,positionCommand: PositionCommand[], groupTourNumber: GroupTourNumber[]) {
        this.groupId = groupId;
        this.positionCommand = positionCommand;
        this.groupTourNumber = groupTourNumber;
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

export class PositionCommand {
    public id: string;
    public position: number;
    public commandId: string;
    public commandName: string;
    public points: number;
    public place: number;
    public fakeCode: boolean;

    constructor(id: string, position: number, commandId: string, commandName: string, points: number, place: number, fakeCode: boolean) {
        this.id = id;
        this.position = position;
        this.commandId = commandId;
        this.commandName = commandName;
        this.points = points;
        this.place = place;
        this.fakeCode = fakeCode;
    }
}

export class Command {
    public commandId: string;
    public commandName: string;

    constructor(commandId: string, commandName: string) {

        this.commandId = commandId;
        this.commandName = commandName;
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
    public commandOneCard: Cards;
    public commandTwoCard: Cards;
    public commandOnePoints: number;
    public commandTwoPoints: number;

    constructor(id: string, idCommandOne: string, idCommandTwo: string, commandOneName: string, commandTwoName: string,
        tour: number, status: number, dateStart: Date, arena: string, commandOneGoals: Goals, commandTwoGoals: Goals,
        commandOneCard: Cards, commandTwoCard: Cards, commandOnePoints: number, commandTwoPoints: number) {
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
        this.commandOneCard = commandOneCard;
        this.commandTwoCard = commandTwoCard;
        this.commandOnePoints = commandOnePoints;
        this.commandTwoPoints = commandTwoPoints;
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

export class Cards {
    public value: number;
    public card: Card[];

    constructor(value: number, card: Card[]) {
        this.value = value;
        this.card = card;
    }
}

export class Card {
    public id: string;
    public turnamentId: string;
    public commandId: string;
    public gameId: string;
    public playerId: string;
    public playerSurname: string;
    public type: number;

    constructor(id: string, turnamentId: string, commandId: string, gameId: string, playerId: string, playerSurname: string, type: number) {
        this.id = id;
        this.turnamentId = turnamentId;
        this.commandId = commandId;
        this.gameId = gameId;
        this.playerId = playerId;
        this.playerSurname = playerSurname;
        this.type = type;
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

export class Cell {
    public value: any;
    public isFake: boolean;

    constructor(value: any, isFake: boolean) {
        this.value = value;
        this.isFake = isFake;
    }
}

export class Player {
    public playerId: string;
    public commandId: string;
    public surname: string;

    constructor(playerId: string, commandId: string, surname: string) {
        this.playerId = playerId;
        this.commandId = commandId;
        this.surname = surname;
    }
}