import { Pipe, PipeTransform } from '@angular/core';
import { Tip } from '../tips/shared/tips';


@Pipe({
  name: 'filtroTips'
})
export class FiltroTipsPipe implements PipeTransform {


  transform(tips: Tip[], texto: string): Tip[] {

    if(texto.length===0){
      return tips;
    }
    texto = texto.toLowerCase();
    return tips.filter(tip =>{
      return tip.descripcion.toLowerCase().includes(texto) //|| tip.tiposAprendizaje.toString().toLowerCase().includes(texto) //|| tip.usuario.nombre.toLowerCase().includes(texto)
    } );

  }


}
