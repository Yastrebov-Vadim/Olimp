import { GetNews } from '../../../model/user/news';

export class NewsResponse {
    news: GetNews[]

    constructor(news: GetNews[]) {
        const self = this;
        self.news = news
    }
}