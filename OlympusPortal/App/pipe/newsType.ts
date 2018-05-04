import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'newsType'
})
export class NewsType implements PipeTransform {
    transform(value: number, args?: any): string {

        if (value == 1) return "текст";
        if (value == 2) return "фотоотчет";
        if (value == 3) return "видео";
    }
}