import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { PageService } from '../../../services/page';
import { TurnamentService } from '../../../services/user/turnament';

import { GetTurnamentForUser } from '../../../model/user/turnament';
import { CommandForTurnament } from '../../../model/user/command';
import { ElementRequest } from '../../../classes/user/requests/elementtRequest';
import { ElementTypeRequest } from '../../../classes/user/requests/elementTypeRequest';

@Component({
    selector: 'new-tournaments',
    templateUrl: './new-tournaments.html'
})
export class NewTournaments implements OnInit {
    public busy: Promise<any>;
    public turnaments: GetTurnamentForUser[];
    public isChecked: boolean = false;
    public isTur: boolean = false;
    
    constructor(
        private toastr: ToastsManager,
        private vcr: ViewContainerRef,
        private pageService: PageService,
        private turnamentService: TurnamentService) {

    }

    ngOnInit(): void {
        var self = this;
        self.pageService.recipeSelected.emit(2);
        self.getTournaments();
    }

    public getTournaments() {
        var self = this;
        self.busy = self.turnamentService.GetTurnamentsForUser(new ElementTypeRequest(1)).then(response => {
            self.turnaments = response.turnaments;
            self.isTur = self.turnaments.length > 0;
            self.isChecked = self.turnaments.length < 2;
        });
    }

    public declareTournament(id, index) {
        var self = this;
        self.busy = self.turnamentService.DeclareTournament(new ElementRequest(id)).then(response => {
            self.turnaments[index].commands.push(new CommandForTurnament(null, response.txt, false));
            self.toastr.success("Заявка подана");
        });
    }
} 
