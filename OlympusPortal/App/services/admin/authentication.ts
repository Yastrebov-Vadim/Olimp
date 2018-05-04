import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { TransportService } from '../transport';
import { Urls } from '../../classes/urls';
import { IsAuth, LoginAdmin } from '../../model/admin/login';


@Injectable()
export class AuthenticationAdminService {
    urls = new Urls();

    constructor(private tranport: TransportService) { }

    SignInAdmin(request: LoginAdmin): Promise<any> {
        var self = this;
        return this.tranport.postData(self.urls.signInAdmin, request);
    }

    IsAuth(): Promise<IsAuth> {
        var self = this;
        return this.tranport.postData(self.urls.isAuth, null);
    }

    SignOutAdmin(): Promise<any> {
        var self = this;
        return this.tranport.postData(self.urls.signOutAdmin, null);
    }

} 