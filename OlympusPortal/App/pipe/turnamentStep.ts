import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'turnamentStep'
})
export class TurnamentStep implements PipeTransform {
    transform(value: number, args?: any): string {

        if (value == 0) return "Редактирование";
        if (value == 1) return "Регистрация";
        if (value == 2) return "Построение";
        if (value == 3) return "В процессе";
        if (value == 4) return "Завершен";
    }
}