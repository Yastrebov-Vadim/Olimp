import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { TransportService } from './transport';
import { Urls } from '../classes/urls';
import { CommandsResponse } from '../classes/response/commandsResponse';
import { CommandFilterResponse } from '../classes/response/commandFilterResponse';

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
} 