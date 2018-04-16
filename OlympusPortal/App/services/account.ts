import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { TransportService } from './transport';
import { Urls } from '../classes/urls';
import { Account, Player } from '../model/account';
import { ElementRequest } from '../classes/requests/accountRequest';
import { ElementResponse } from '../classes/response/accountResponse';

@Injectable()
export class AccountService {
    urls = new Urls();

    constructor(private tranport: TransportService) { }

    GetAccount(): Promise<Account> {
        var self = this;
        return this.tranport.postData(self.urls.getAccount, null);
    }

    AddPlayer(request: Player): Promise<ElementResponse> {
        var self = this;
        return this.tranport.postData(self.urls.addPlayer, request);
    }

    DellPlayer(request: ElementRequest): Promise<any> {
        var self = this;
        return this.tranport.postData(self.urls.dellPlayer, request);
    }

    EditAccountInfo(request: Account): Promise<any> {
        var self = this;
        return this.tranport.postData(self.urls.editAccountInfo, request);
    }
} 