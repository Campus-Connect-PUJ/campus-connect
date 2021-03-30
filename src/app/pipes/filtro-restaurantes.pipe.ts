import { Pipe, PipeTransform } from '@angular/core';
import { Restaurante } from '../Model/Restaurante/restaurante';

@Pipe({
  name: 'filtroRestaurantes'
})
export class FiltroRestaurantesPipe implements PipeTransform {

  transform(restaurantes: Restaurante[], texto: string): Restaurante[] {

    if(texto.length===0){
      return restaurantes;
    }
    texto = texto.toLowerCase();

    return restaurantes.filter(restaurante =>{
      return restaurante.nombre.toLowerCase().includes(texto) || restaurante.descripcion.toLowerCase().includes(texto);
    } );

  }


}
