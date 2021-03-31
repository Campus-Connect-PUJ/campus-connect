import { Pipe, PipeTransform } from '@angular/core';
import { Facultad } from '../Model/Facultad/facultad';
import { GrupoEstudiantil } from '../Model/GrupoEstudiantil/grupo-estudiantil';

@Pipe({
  name: 'filtroFacultadGrupos'
})
export class FiltroFacultadGruposPipe implements PipeTransform {

  transform(grupos: GrupoEstudiantil[], facultad: Facultad): GrupoEstudiantil[] {
    if(facultad===null){
      return grupos;
    }

    return grupos.filter(grupo =>{
      return grupo.facultad.descripcion.includes(facultad.descripcion) ;
    } );

  }

}
