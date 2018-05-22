import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { TransportService } from '../transport';
import { Urls } from '../../classes/urls';
import { ElementRequest } from '../../classes/admin/requests/ElementRequest';
import { ElementTypeResponse } from '../../classes/admin/response/elementTypeResponse';
import { TurnamentInfoResponse, GetCircleTurnamentResponse, GetMixedTurnamentResponse, GetArenaResponse } from '../../classes/admin/response/turnamentResponse';
import { SaveMixedTurnamentInfoRequest, CalculateGroupRequest, SaveCircleTurnamentInfoRequest, TurnamentStepRequest, DeclareRequest, DivideForDayRequest, ChangeGameDayRequest, TourStepRequest, CompleteGameRequest, RemoveDeclareRequest } from '../../classes/admin/requests/turnamentRequest';

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
} 