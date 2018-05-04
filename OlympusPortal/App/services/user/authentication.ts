import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { TransportService } from '../transport';
import { Urls } from '../../classes/urls';
import { AuthorizationRequest } from '../../classes/user/requests/authorizationRequest';
import { AccountResponse } from '../../classes/user/response/accountResponse';
import { UserRegistration } from '../../model/user/user';


@Injectable()
export class AuthenticationService {
    urls = new Urls();

    constructor(private tranport: TransportService) { }

    SignInUser(request: AuthorizationRequest): Promise<any> {
        var self = this;
        return this.tranport.postData(self.urls.signInUser, request);
    }

    GetAccount(): Promise<AccountResponse> {
        var self = this;
        return this.tranport.postData(self.urls.account, null);
    }

    SignOutUser(): Promise<any> {
        var self = this;
        return this.tranport.postData(self.urls.signOutUser, null);
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