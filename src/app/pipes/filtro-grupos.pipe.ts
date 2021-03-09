import { Pipe, PipeTransform } from '@angular/core';
import { GrupoEstudiantil } from '../grupos-estudiantiles/shared/grupo-estudiantil';

@Pipe({
  name: 'filtroGrupos'
})
export class FiltroGruposPipe implements PipeTransform {

  transform(grupos: GrupoEstudiantil[], texto: string): GrupoEstudiantil[] {

    if(texto.length===0){
      return grupos;
    }
    texto = texto.toLowerCase();

    return grupos.filter(grupo =>{
      return grupo.nombre.toLowerCase().includes(texto) || grupo.descripcion.toLowerCase().includes(texto) ;
    } );

  }

}
