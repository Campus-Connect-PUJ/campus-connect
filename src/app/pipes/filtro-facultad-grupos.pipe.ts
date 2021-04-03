import { Pipe, PipeTransform } from '@angular/core';
import { Facultad } from '../Model/Facultad/facultad';
import { GrupoEstudiantil } from '../Model/GrupoEstudiantil/grupo-estudiantil';

@Pipe({
  name: 'filtroFacultadGrupos'
})
export class FiltroFacultadGruposPipe implements PipeTransform {

  transform(grupos: GrupoEstudiantil[], facultad: string): GrupoEstudiantil[] {
    if(facultad.length===0){
      return grupos;
    }

    return grupos.filter(grupo =>{
      return grupo.facultades.some(facu => facu.nombre===facultad);
    } );

  }

}
