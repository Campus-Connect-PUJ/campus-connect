import { Pipe, PipeTransform } from '@angular/core';
import { Tip } from '../Model/Tip/tip';

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
      let a=false;
      tip.tiposAprendizaje.filter(res=> {
        let b=false;
        b=res.descripcion.toLowerCase().includes(texto);
        if(b){
          a=b;
        }
      })
      return a || tip.descripcion.toLowerCase().includes(texto)
    } ); 

  }


}
