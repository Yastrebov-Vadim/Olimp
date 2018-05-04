import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { PageService } from '../../../services/page';
import { EmailService } from '../../../services/user/email';

@Component({
    selector: 'new-tournaments',
    templateUrl: './new-tournaments.html'
})
export class NewTournaments implements OnInit {
    public busy: Promise<any>;
    public bank: string;
    public isChecked: boolean = true;
    
    constructor(
        private toastr: ToastsManager,
        private vcr: ViewContainerRef,
        private pageService: PageService,
        private emailService: EmailService) {

    }

    ngOnInit(): void {
        var self = this;
        self.pageService.recipeSelected.emit(2);
    }

    public showcommand(id) {
        var self = this;
        document.getElementById(id).style.display = "block";
    }

    public getNews() {
        //var self = this;
        //self.busy = self.emailService.GetNewsBriefly().then(response => {
           
        //});
    }
}
