import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { PageService } from '../../services/page';

@Component({
    selector: 'current-tournaments',
    templateUrl: './current-tournaments.html'
})
export class CurrentTournaments implements OnInit {
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
