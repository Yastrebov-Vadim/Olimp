import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class TransportService {
    private readonly headers = new Headers({ 'Content-Type': 'application/json' });
    private responseImg: any;

    constructor(private http: Http,
        private toastr: ToastsManager) {
    }

    postData<T>(url: string, data: Object): Promise<T> {
        var self = this;

        var options = new RequestOptions({ headers: self.headers });

        return self.http.post(url, data, options)
            .toPromise()
            .then(self.extractData)
            .catch(error => self.handleError(error, self));
    }

    private extractData(response: Response) {
        return response.json() || {};
    }

    private handleError(error: Response | any, self: TransportService) {
        var errMsg: string;

        if (error instanceof Response) {
            var body = error.json() || '';
            errMsg = body.Message || JSON.stringify(body);
            if (error.statusText == "Unauthorized")
                errMsg = "Необходимо авторизоваться. Возпользуйтесть кнопкой \"Войти\"";
        } else {
            errMsg = error.message ? error.message : error.toString();
        }

        console.error(errMsg);
        self.toastr.error(errMsg);
        return Promise.reject(errMsg);
    }


    postDataImg<T>(url: string, data: Object): Promise<T> {
        var self = this;

        return self.http.post(url, data)
            .toPromise()
            .then(self.extractData)
            .catch(error => self.handleError(error, self));
    }
}
