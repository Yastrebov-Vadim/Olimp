import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { TransportService } from './transport';
import { Urls } from '../classes/urls';
import { Account, Player } from '../model/account';
import { ElementResponse } from '../classes/response/accountResponse';

@Injectable()
export class ImageService {
    urls = new Urls();

    constructor(private tranport: TransportService) { }

    GetImageAvatar(request: FormData): Promise<ElementResponse> {
        var self = this;
        return self.tranport.postDataImg(self.urls.getImageAvatar, request);
    }
    
}