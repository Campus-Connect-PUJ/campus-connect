import { Pipe, PipeTransform } from '@angular/core';
import { Restaurante } from '../Model/Restaurante/restaurante';

@Pipe({
  name: 'filtroRestauranteTiempo'
})
export class FiltroRestauranteTiempoPipe implements PipeTransform {

  transform(restaurantes: Restaurante[], tiempo: number): Restaurante[] {

    if(tiempo===0){
      return restaurantes;
    }
    
    return restaurantes.filter(restaurante =>{
      return restaurante.tiempoEntrega<=tiempo ;
    } );
  } 

}
