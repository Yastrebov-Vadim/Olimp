﻿import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { TransportService } from '../transport';
import { Urls } from '../../classes/urls';
import { ElementRequest } from '../../classes/admin/requests/ElementRequest';
import { ElementTypeResponse } from '../../classes/admin/response/elementTypeResponse';
import { ElementResponse } from '../../classes/admin/response/elementResponse';
import { TurnamentInfoResponse, GetCircleTurnamentResponse, GetMixedTurnamentResponse, GetArenaResponse, GetPlayerForTurnamentResponse } from '../../classes/admin/response/turnamentResponse';
import { SaveMixedTurnamentInfoRequest, AddCardRequest, AddGoalRequest, CalculateGroupRequest, SaveCircleTurnamentInfoRequest, TurnamentStepRequest, DeclareRequest, DivideForDayRequest, ChangeGameDayRequest, TourStepRequest, CompleteGameRequest, RemoveDeclareRequest } from '../../classes/admin/requests/turnamentRequest';

@Injectable()
export class TurnamentAdminService {
    urls = new Urls();

    constructor(private tranport: TransportService) { }

    GetTurnamentInfo(): Promise<TurnamentInfoResponse> {
        var self = this;
        return this.tranport.postData(self.urls.getTurnamentInfo, null);
    }

    AddTurnament(request: ElementRequest): Promise<ElementTypeResponse> {
        var self = this;
        return this.tranport.postData(self.urls.addTurnament, request);
    }

    DellTurnament(request: ElementRequest): Promise<any> {
        var self = this;
        return this.tranport.postData(self.urls.dellTurnament, request);
    }

    GetTurnamentCircle(request: ElementRequest): Promise<GetCircleTurnamentResponse> {
        var self = this;
        return this.tranport.postData(self.urls.getTurnamentCircle, request);
    }

    GetTurnamentMixed(request: ElementRequest): Promise<GetMixedTurnamentResponse> {
        var self = this;
        return this.tranport.postData(self.urls.getTurnamentMixed, request);
    }

    GetPlayerForTurnament(request: ElementRequest): Promise<GetPlayerForTurnamentResponse> {
        var self = this;
        return this.tranport.postData(self.urls.getPlayerForTurnament, request);
    }
    
    SaveCircleTurnamentInfo(request: SaveCircleTurnamentInfoRequest): Promise<any> {
        var self = this;
        return this.tranport.postData(self.urls.saveTurnamentInfo, request);
    }

    SaveMixedTurnamentInfo(request: SaveMixedTurnamentInfoRequest): Promise<any> {
        var self = this;
        return this.tranport.postData(self.urls.saveTurnamentInfo, request);
    }

    ChangeStep(request: TurnamentStepRequest): Promise<any> {
        var self = this;
        return this.tranport.postData(self.urls.changeStep, request);
    }

    ChangeArena(request: ChangeGameDayRequest): Promise<any> {
        var self = this;
        return this.tranport.postData(self.urls.changeArena, request);
    }

    ChangeDate(request: ChangeGameDayRequest): Promise<any> {
        var self = this;
        return this.tranport.postData(self.urls.changeDate, request);
    }

    AcceptDeclare(request: DeclareRequest): Promise<any> {
        var self = this;
        return this.tranport.postData(self.urls.acceptDeclare, request);
    }

    RemoveDeclare(request: RemoveDeclareRequest): Promise<any> {
        var self = this;
        return this.tranport.postData(self.urls.removeDeclare, request);
    }

    CalculateTable(request: ElementRequest): Promise<any> {
        var self = this;
        return this.tranport.postData(self.urls.calculateTable, request);
    }

    CalculateGroup(request: CalculateGroupRequest): Promise<any> {
        var self = this;
        return this.tranport.postData(self.urls.calculateGroup, request);
    }

    CalculatePlayOff(request: ElementRequest): Promise<any> {
        var self = this;
        return this.tranport.postData(self.urls.calculatePlayOff, request);
    }
    
    DivideForDay(request: DivideForDayRequest): Promise<any> {
        var self = this;
        return this.tranport.postData(self.urls.divideForDay, request);
    }

    GetArena(): Promise<GetArenaResponse> {
        var self = this;
        return this.tranport.postData(self.urls.getArena, null);
    }

    ChangeStatusTour(request: TourStepRequest): Promise<any> {
        var self = this;
        return this.tranport.postData(self.urls.changeStatusTour, request);
    }

    CompleteGame(request: CompleteGameRequest): Promise<any> {
        var self = this;
        return this.tranport.postData(self.urls.completeGame, request);
    }

    CloseTour(request: TourStepRequest): Promise<any> {
        var self = this;
        return this.tranport.postData(self.urls.closeTour, request);
    }

    AddGoals(request: AddGoalRequest): Promise<any> {
        var self = this;
        return this.tranport.postData(self.urls.addGoals, request);
    }

    AddCard(request: AddCardRequest): Promise<any> {
        var self = this;
        return this.tranport.postData(self.urls.addCard, request);
    }

    AddArena(request: ElementRequest): Promise<ElementResponse> {
        var self = this;
        return this.tranport.postData(self.urls.addArena, request);
    }

    DellArena(request: ElementRequest): Promise<any> {
        var self = this;
        return this.tranport.postData(self.urls.dellArena, request);
    }
} 