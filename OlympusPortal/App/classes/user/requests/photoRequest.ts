export class GetPhotoRequest {
    page: number
    id: string

    constructor(page: number, id: string) {
        this.page = page;
        this.id = id;
    }
}