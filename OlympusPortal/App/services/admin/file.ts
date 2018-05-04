import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { TransportService } from '../transport';
import { Urls } from '../../classes/urls';
import { PhotoResponse } from '../../classes/admin/response/photoResponse';
import { ElementRequest } from '../../classes/admin/requests/elementRequest';
import { ElementResponse } from '../../classes/admin/response/elementResponse';

@Injectable()
export class FileService {
    urls = new Urls();

    constructor(private tranport: TransportService) { }

    AddImgNewsTypeText(request: FormData): Promise<PhotoResponse> {
        var self = this;
        return self.tranport.postDataImg(self.urls.addImgNewsTypeText, request);
    }

    AddImgNewsTypePhoto(request: FormData): Promise<PhotoResponse> {
        var self = this;
        return self.tranport.postDataImg(self.urls.addImgNewsTypePhoto, request);
    }

    DellPhoto(request: ElementRequest): Promise<any> {
        var self = this;
        return self.tranport.postDataImg(self.urls.dellPhoto, request);
    }

    AddVideoForNews(request: FormData): Promise<ElementResponse> {
        var self = this;
        return self.tranport.postDataImg(self.urls.addVideoForNews, request);
    }
} 