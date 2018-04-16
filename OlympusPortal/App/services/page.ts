import { EventEmitter } from '@angular/core';
import { Account } from '../model/user';

export class PageService {

    recipeSelected = new EventEmitter<number>();

    private account: number = 1;
}