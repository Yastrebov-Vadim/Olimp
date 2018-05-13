import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { TransportService } from '../transport';
import { Urls } from '../../classes/urls';
import { NewsInfoResponse, NewsResponse } from '../../classes/admin/response/newsResponse';
import { ElementResponse } from '../../classes/user/response/elementResponse';
import { ElementRequest } from '../../classes/user//requests/elementtRequest';
import { SetNews, GetNews } from '../../model/admin/news';

@Injectable()
export class NewsAdminService {
    urls = new Urls();

    constructor(private tranport: TransportService) { }

    GetNewsInfo(): Promise<NewsInfoResponse> {
        var self = this;
        return this.tranport.postData(self.urls.getNewsInfo, null);
    }

    GetNews(request: ElementRequest): Promise<NewsResponse> {
        var self = this;
        return this.tranport.postData(self.urls.getNews, request);
    }

    AddNews(request: ElementRequest): Promise<ElementResponse> {
        var self = this;
        return self.tranport.postData(self.urls.addNews, request);
    }

    SaveNews(request: SetNews): Promise<ElementResponse> {
        var self = this;
        return self.tranport.postData(self.urls.saveNews, request);
    }

    DellNews(request: ElementRequest): Promise<NewsInfoResponse> {
        var self = this;
        return this.tranport.postData(self.urls.dellNews, request);
    }

    ActiveNews(request: ElementRequest): Promise<ElementResponse> {
        var self = this;
        return this.tranport.postData(self.urls.activeNews, request);
    }
} 