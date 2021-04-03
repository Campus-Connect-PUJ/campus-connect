import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroTipsAprendizaje'
})
export class FiltroTipsAprendizajePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
