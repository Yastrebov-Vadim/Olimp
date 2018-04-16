import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { TransportService } from './transport';
import { Urls } from '../classes/urls';
import { AuthorizationRequest } from '../classes/requests/authorizationRequest';
import { AccountResponse } from '../classes/response/accountResponse';
import { UserRegistration } from '../model/user';


@Injectable()
export class AuthenticationService {
    urls = new Urls();

    constructor(private tranport: TransportService) { }

    Authorization(request: AuthorizationRequest): Promise<any> {
        var self = this;
        return this.tranport.postData(self.urls.authorization, request);
    }

    GetAccount(): Promise<AccountResponse> {
        var self = this;
        return this.tranport.postData(self.urls.account, null);
    }

    Exit(): Promise<any> {
        var self = this;
        return this.tranport.postData(self.urls.exit, null);
    }


    registration(request: UserRegistration): Promise<any> {
        var self = this;
        return this.tranport.postData(self.urls.registration, request);
    }

    confirmTheCode(request: UserRegistration): Promise<any> {
        var self = this;
        return this.tranport.postData(self.urls.confirmTheCode, request);
    }

    replacePassvord(request: UserRegistration): Promise<any> {
        var self = this;
        return this.tranport.postData(self.urls.replacePassvord, request);
    }
    
} 