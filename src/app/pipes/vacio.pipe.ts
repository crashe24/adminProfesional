import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vacio'
})
export class VacioPipe implements PipeTransform {

  transform(value: string): any {
      if (value) {
          return value;
      }
    return '';
  }

}
