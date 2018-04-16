import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { PageService } from '../../services/page';

@Component({
    selector: 'past-tournaments',
    templateUrl: './past-tournaments.html'
})
export class PastTournaments implements OnInit {
    public busy: Promise<any>;
    public bank: string;

    constructor(
        private toastr: ToastsManager,
        private vcr: ViewContainerRef,
        private pageService: PageService) {

    }

    ngOnInit(): void {
        var self = this;
        self.pageService.recipeSelected.emit(2);
    }
}
