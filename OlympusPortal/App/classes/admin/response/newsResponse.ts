import { GetNewsInfo, GetNews } from '../../../model/admin/news';

export class NewsInfoResponse {
    news: GetNewsInfo[]

    constructor(news: GetNewsInfo[]) {
        this.news = news
    }
}

export class NewsResponse {
    news: GetNews

    constructor(news: GetNews) {
        this.news = news
    }
}