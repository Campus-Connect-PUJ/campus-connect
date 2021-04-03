import { Pipe, PipeTransform } from '@angular/core';
import { Restaurante } from '../Model/Restaurante/restaurante';
import { RestauranteService } from '../Model/Restaurante/restaurante.service';
import { TipoComida } from '../Model/TipoComida/tipo-comida';

@Pipe({
  name: 'filtroRestaurantesTipoComida'
})
export class FiltroRestaurantesTipoComidaPipe implements PipeTransform {
  
  

  transform(restaurantes: Restaurante[], tipoComida: string): Restaurante[] {

    if(tipoComida.length===0){
      return restaurantes;
    }
    tipoComida=tipoComida.toLowerCase();
    
    return restaurantes.filter(restaurante =>{
      return restaurante.tiposComida.some(tc => tc.tipo === tipoComida);
    } );
  }
}
