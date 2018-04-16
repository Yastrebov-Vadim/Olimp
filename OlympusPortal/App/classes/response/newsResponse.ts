import { NewsBriefly } from '../../model/news';

export class NewsBrieflyResponse {
    newsBriefly: NewsBriefly[]

    constructor(newsBriefly: NewsBriefly[]) {
        const self = this;
        self.newsBriefly = newsBriefly
    }
}