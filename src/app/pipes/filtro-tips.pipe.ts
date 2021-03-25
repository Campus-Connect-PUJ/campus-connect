import { Pipe, PipeTransform } from '@angular/core';
import { Tip, TipoAprendizaje} from '../tips/shared/tips';


@Pipe({
  name: 'filtroTips'
})
export class FiltroTipsPipe implements PipeTransform {


  transform(tips: Tip[], texto: string): Tip[] {

    if(texto.length===0){
      return tips;
    }
    texto = texto.toLowerCase();
    
    /*
    console.log(tips.filter(tip =>{ return tip.descripcion.toLowerCase().includes(texto) }));
    return tips.filter(tip =>{ return tip.descripcion.toLowerCase().includes(texto) });
    */
    console.log(tips)
    return tips.filter(tip =>{
      let a=false;
      //tip.respuestas.filter(res=> {let b= false; b=res.descripcion.toLowerCase().includes(texto); if(b){a=b}}) //|| tip.usuario.nombre.toLowerCase().includes(texto)
      return tip.descripcion.toLowerCase().includes(texto)
      // tip.descripcion.toLowerCase().includes(texto)
    } ); 

  }


}
