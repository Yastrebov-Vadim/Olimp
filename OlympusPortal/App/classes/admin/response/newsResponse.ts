import { GetNewsInfo, GetNews } from '../../../model/admin/news';

export class NewsInfoResponse {
    news: GetNewsInfo[]

    constructor(news: GetNewsInfo[]) {
        const self = this;
        self.news = news
    }
}

export class NewsResponse {
    news: GetNews

    constructor(news: GetNews) {
        const self = this;
        self.news = news
    }
}