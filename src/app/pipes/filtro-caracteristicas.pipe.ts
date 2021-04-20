import { Pipe, PipeTransform } from '@angular/core';
import { Caracteristica } from '../Model/Caracteristica/caracteristica';

@Pipe({
  name: 'filtroCaracteristicas'
})
export class FiltroCaracteristicasPipe implements PipeTransform {

  transform(caracteristicas: Caracteristica[], texto: string): Caracteristica[] {

    if(texto.length===0){
      return caracteristicas;
    }
    texto=texto.toLowerCase();
    
    return caracteristicas.filter(caracyeristica =>{
      return  caracyeristica.nombre.toLowerCase().includes(texto);
    } );
  }

}
