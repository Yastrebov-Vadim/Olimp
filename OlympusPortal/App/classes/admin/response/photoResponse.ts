import { FileBd } from '../../../model/admin/file';

export class PhotoResponse {
    photo: FileBd

    constructor(photo: FileBd) {
        this.photo = photo;
    }
}