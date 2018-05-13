import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { TransportService } from '../transport';
import { Urls } from '../../classes/urls';
import { ElementRequest } from '../../classes/admin/requests/ElementRequest';
import { ElementResponse } from '../../classes/admin/response/elementResponse';
import { TurnamentInfoResponse, GetTurnamentResponse } from '../../classes/admin/response/turnamentResponse';
import { SaveTurnamentInfoRequest, TurnamentStepRequest, DeclareRequest } from '../../classes/admin/requests/turnamentRequest';

@Injectable()
export class TurnamentAdminService {
    urls = new Urls();

    constructor(private tranport: TransportService) { }

    GetTurnamentInfo(): Promise<TurnamentInfoResponse> {
        var self = this;
        return this.tranport.postData(self.urls.getTurnamentInfo, null);
    }

    AddTurnament(request: ElementRequest): Promise<ElementResponse> {
        var self = this;
        return this.tranport.postData(self.urls.addTurnament, request);
    }

    DellTurnament(request: ElementRequest): Promise<any> {
        var self = this;
        return this.tranport.postData(self.urls.dellTurnament, request);
    }

    GetTurnament(request: ElementRequest): Promise<GetTurnamentResponse> {
        var self = this;
        return this.tranport.postData(self.urls.getTurnament, request);
    }

    SaveTurnamentInfo(request: SaveTurnamentInfoRequest): Promise<any> {
        var self = this;
        return this.tranport.postData(self.urls.saveTurnamentInfo, request);
    }

    ChangeStep(request: TurnamentStepRequest): Promise<any> {
        var self = this;
        return this.tranport.postData(self.urls.changeStep, request);
    }

    AcceptDeclare(request: DeclareRequest): Promise<any> {
        var self = this;
        return this.tranport.postData(self.urls.acceptDeclare, request);
    }

    RemoveDeclare(request: DeclareRequest): Promise<any> {
        var self = this;
        return this.tranport.postData(self.urls.removeDeclare, request);
    }

    CalculateTable(request: ElementRequest): Promise<any> {
        var self = this;
        return this.tranport.postData(self.urls.calculateTable, request);
    }
} 