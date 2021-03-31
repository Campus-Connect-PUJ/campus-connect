import { Pipe, PipeTransform } from '@angular/core';
import { Restaurante } from '../Model/Restaurante/restaurante';
import { TipoComida } from '../Model/TipoComida/tipo-comida';

@Pipe({
  name: 'filtroRestaurantesTipoComida'
})
export class FiltroRestaurantesTipoComidaPipe implements PipeTransform {

  transform(restaurantes: Restaurante[], tipoComida: TipoComida): Restaurante[] {

    if(tipoComida===null){
      return restaurantes;
    }
    
    return restaurantes.filter(restaurante =>{
      return restaurante.tipoComida.includes(tipoComida);
    } );

  }

}
