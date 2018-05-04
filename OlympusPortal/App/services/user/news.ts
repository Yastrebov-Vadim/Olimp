import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { TransportService } from '../transport';
import { Urls } from '../../classes/urls';
import { NewsResponse } from '../../classes/user/response/newsResponse';
import { TopRequest } from '../../classes/user/requests/newsRequest';

@Injectable()
export class NewsService {
    urls = new Urls();

    constructor(private tranport: TransportService) { }

    GetNewsTop(request: TopRequest): Promise<NewsResponse> {
        var self = this;
        return this.tranport.postData(self.urls.getNewsActiveTop, request);
    }

    GetNewsActive(request: TopRequest): Promise<NewsResponse> {
        var self = this;
        return this.tranport.postData(self.urls.getNewsActive, request);
    }
}