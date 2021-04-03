import { Pipe, PipeTransform } from '@angular/core';
import { Restaurante } from '../Model/Restaurante/restaurante';

@Pipe({
  name: 'filtroRestaurantesPrecio'
})
export class FiltroRestaurantesPrecioPipe implements PipeTransform {

  transform(restaurantes: Restaurante[], precio: number): Restaurante[] {

    if(precio===0){
      return restaurantes;
    }
    

    return restaurantes.filter(restaurante =>{
      return restaurante.precioMin<=precio && restaurante.precioMax >=precio ;
    } );
  } 
}
