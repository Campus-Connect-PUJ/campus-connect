import { Pipe, PipeTransform } from '@angular/core';
import { UsuarioGeneral } from '../Model/UsuarioGeneral/usuario-general';

@Pipe({
  name: 'filtroMonitores'
})
export class FiltroMonitoresPipe implements PipeTransform {

  transform(monitores: UsuarioGeneral[], texto: string): UsuarioGeneral[]{

    if(texto.length===0){
      return monitores;
    }

    texto = texto.toLowerCase();
    
    return monitores.filter(monitor =>{

      return monitor.nombre.toLowerCase().includes(texto) || monitor.apellido.toLowerCase().includes(texto) ||monitor.email.toLowerCase().includes(texto) || monitor.puntajeTotal.toString().includes(texto)
      
    } ); 


  }

}
