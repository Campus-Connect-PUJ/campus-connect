import { Pipe, PipeTransform } from '@angular/core';
import { GrupoEstudiantil } from '../Model/GrupoEstudiantil/grupo-estudiantil';
import { Tematica } from '../Model/Tematica/tematica';

@Pipe({
  name: 'filtroTematicaGurpos'
})
export class FiltroTematicaGurposPipe implements PipeTransform {

  transform(grupos: GrupoEstudiantil[], tematica: Tematica): GrupoEstudiantil[] {
    if(tematica===null){
      return grupos;
    }

    return grupos.filter(grupo =>{
      return grupo.tematicas.includes(tematica) ;
    } );

  }

}
