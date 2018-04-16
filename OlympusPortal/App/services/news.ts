import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { TransportService } from './transport';
import { Urls } from '../classes/urls';
import { NewsBrieflyResponse } from '../classes/response/newsResponse';

@Injectable()
export class NewsService {
    urls = new Urls();

    constructor(private tranport: TransportService) { }

    GetNewsBriefly(): Promise<NewsBrieflyResponse> {
        var self = this;
        return this.tranport.postData(self.urls.newsBriefly, null);
    }
}