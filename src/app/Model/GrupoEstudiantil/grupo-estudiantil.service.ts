import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { NetService } from '@utils/net.service';
import { environment } from 'src/environments/environment';
import { NetService } from 'src/app/utils/net.service';
import { GrupoEstudiantil } from './grupo-estudiantil';
import { Caracteristica } from '../Caracteristica/caracteristica';


@Injectable({
  providedIn: 'root'
})
export class GrupoEstudiantilService {
  constructor(private net: NetService) { }

  getGrupos(): Observable<GrupoEstudiantil[]> {
    const url = `${environment.baseUrl}/grupo_estudiantil/all`;
    return this.net.get<GrupoEstudiantil[]>(url);
  }

  getGrupoById(id: number): Observable<GrupoEstudiantil> {
    const url = `${environment.baseUrl}/grupo_estudiantil/${id}`;
    return this.net.get<GrupoEstudiantil>(url);
  }
  
  getCaracteristicasGrupoById(id: number): Observable<Caracteristica[]> {
    const url = `${environment.baseUrl}/grupo_estudiantil/${id}/caracteristicas`;
    return this.net.get<Caracteristica[]>(url);
  }
  // create(grupoEstudiantil: GrupoEstudiantil) {
  //   const url = `${environment.baseUrl}/foros`;
  //   return this.net.post(
  //     url,
  //     {
  //       name: grupoEstudiantil.name,
  //       ownerId: grupoEstudiantil.ownerId
  //     }
  //   );
  // }

  // edit(GrupoEstudiantil: GrupoEstudiantil) {
  //   const url = `${environment.baseUrl}/foros`;
  //   return this.net.put(
  //     url,
  //     {
  //       name: GrupoEstudiantil.name,
  //       id: GrupoEstudiantil.id
  //     }
  //   );
  // }

  // delete(GrupoEstudiantil: GrupoEstudiantil, id: number) {
  //   const url = `${environment.baseUrl}/foros`;
  //   return this.net.delete(
  //     url,
  //     {
  //       id: GrupoEstudiantil.id,
  //       ownerId: id
  //     }
  //   );
  // }
}
