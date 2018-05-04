import { PhotoCommand } from '../../../model/user/photo';

export class GetPhotoResponse {
    photos: PhotoCommand[]

    constructor(photos: PhotoCommand[]) {
        this.photos = photos;
    }
}