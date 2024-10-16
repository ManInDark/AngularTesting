import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    standalone: true,
    name: 'capitalize',
})
export class CapitalizePipe implements PipeTransform {
    transform(value: string): string {
        return value.length === 0 ? "" : `${value[0].toUpperCase() + value.slice(1).toLowerCase()}`;
    }
}