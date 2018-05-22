import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'tuning-turnament',
    templateUrl: './tuning-turnament.html'
})

export class TuningTurnament {
    public id: string;
    public type: string;
    
    constructor(
        private route: ActivatedRoute) {
        var self = this;

        route.queryParams.subscribe(
            params => {
                self.id = params["key"];
                self.type = params["type"];
            });
    }
} 
