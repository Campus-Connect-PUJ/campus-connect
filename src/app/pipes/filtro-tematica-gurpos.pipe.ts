import { Pipe, PipeTransform } from '@angular/core';
import { GrupoEstudiantil } from '../Model/GrupoEstudiantil/grupo-estudiantil';
import { Tematica } from '../Model/Tematica/tematica';

@Pipe({
  name: 'filtroTematicaGurpos'
})
export class FiltroTematicaGurposPipe implements PipeTransform {

  transform(grupos: GrupoEstudiantil[], tematica: string): GrupoEstudiantil[] {
    if(tematica.length===0){
      return grupos;
    }

    return grupos.filter(grupo =>{
      return grupo.tematicas.some(tem => tem.nombre === tematica);
    } );

  }

}
