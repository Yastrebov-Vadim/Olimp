import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { TransportService } from '../transport';
import { Urls } from '../../classes/urls';
import { ElementTypeRequest } from '../../classes/user/requests/elementTypeRequest';
import { GetTurnamentForUserResponse } from '../../classes/user/response/turnamentResponse';
import { ElementRequest } from '../../classes/user/requests/elementtRequest';
import { ElementResponse } from '../../classes/user/response/elementResponse';

@Injectable()
export class TurnamentService {
    urls = new Urls();

    constructor(private tranport: TransportService) { }

    GetTurnamentsForUser(): Promise<GetTurnamentForUserResponse> {
        var self = this;
        return this.tranport.postData(self.urls.getTurnamentsForUser, null);
    }

    GetTurnaments(request: ElementTypeRequest): Promise<GetTurnamentForUserResponse> {
        var self = this;
        return this.tranport.postData(self.urls.getTurnaments, request);
    }

    DeclareTournament(request: ElementRequest): Promise<ElementResponse> {
        var self = this;
        return this.tranport.postData(self.urls.declareTournament, request);
    }
} 