import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { TransportService } from '../transport';
import { Urls } from '../../classes/urls';
import { SingCodeToEmailRequest } from '../../classes/user/requests/emailRequest';

@Injectable()
export class EmailService {
    urls = new Urls();

    constructor(private tranport: TransportService) { }

    singCodeToEmail(request: SingCodeToEmailRequest): Promise<any> {
        var self = this;
        return this.tranport.postData(self.urls.codToEmail, request);
    }
}