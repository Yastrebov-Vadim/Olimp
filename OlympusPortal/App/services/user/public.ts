import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { TransportService } from '../transport';
import { Urls } from '../../classes/urls';
import { CommandsResponse } from '../../classes/user/response/commandsResponse';
import { CommandFilterResponse } from '../../classes/user/response/commandFilterResponse';
import { GetPhotoResponse } from '../../classes/user/response/photoResponse';
import { GetPhotoRequest } from '../../classes/user/requests/photoRequest';

@Injectable()
export class HomeService {
    urls = new Urls();

    constructor(private tranport: TransportService) { }

    GetCommand(): Promise<CommandsResponse> {
        var self = this;
        return this.tranport.postData(self.urls.command, null);
    }

    GetCommandFilter(): Promise<CommandFilterResponse> {
        var self = this;
        return this.tranport.postData(self.urls.commandFilter, null);
    }

    GetPhoto(request: GetPhotoRequest): Promise<GetPhotoResponse> {
        var self = this;
        return this.tranport.postData(self.urls.getPhoto, request);
    }
} 