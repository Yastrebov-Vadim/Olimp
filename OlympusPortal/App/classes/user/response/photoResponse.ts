export class GetPhotoResponse {
    currentPage: number
    pageSize: number
    photos: string[]

    constructor(currentPage: number, pageSize: number, photos: string[]) {
        this.currentPage = currentPage;
        this.pageSize = pageSize;
        this.photos = photos;
    }
}