import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'turnamentType'
})
export class TurnamentType implements PipeTransform {
    transform(value: number, args?: any): string {

        if (value == 1) return "Круговой";
        if (value == 2) return "Смешанный";
    }
}