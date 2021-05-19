import { Pipe, PipeTransform } from '@angular/core';
import { Tip } from '../Model/Tip/tip';

@Pipe({
  name: 'filtroTipsAprendizaje'
})
export class FiltroTipsAprendizajePipe implements PipeTransform {

  transform(tips: Tip[], texto: any[]): Tip[]{
    let listaDeTips = []
    if(texto.length == 0){
      return tips;
    }

    for(let i=0; i<texto.length; i++){
      console.log(texto[i])
      for(let j=0; j<tips.length; j++){
        for(let k=0; k<tips[j].tiposAprendizaje.length; k++){
          if(tips[j].tiposAprendizaje[k].descripcion == texto[i] && !listaDeTips.includes(tips[j])){
            listaDeTips.push(tips[j])
          }
        }
      }
    }

    console.log("lista", listaDeTips)
    return listaDeTips;
  }
}
