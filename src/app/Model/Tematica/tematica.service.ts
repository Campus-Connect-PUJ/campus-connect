import { Injectable } from '@angular/core';
import { NetService } from 'src/app/utils/net.service';
import { Tematica } from './tematica';
import { Observable } from 'rxjs';
// import { NetService } from '@utils/net.service';
import { environment } from 'src/environments/environment';
import { GrupoEstudiantil } from '../GrupoEstudiantil/grupo-estudiantil';
import { Caracteristica } from '../Caracteristica/caracteristica';

@Injectable({
  providedIn: 'root'
})
export class TematicaService {

  constructor(private net: NetService) { }

  getTematicas(): Observable<Tematica[]> {
    const url = `${environment.baseUrl}/tematica/all`;
    return this.net.get<Tematica[]>(url);
  }

  getTematicaById(id: number): Observable<Tematica> {
    const url = `${environment.baseUrl}/tematica/${id}`;
    return this.net.get<Tematica>(url);
  }

  getGruposTematicaById(id: number): Observable<GrupoEstudiantil[]> {
    const url = `${environment.baseUrl}/tematica/${id}/grupos_estudiantiles`;
    return this.net.get<GrupoEstudiantil[]>(url);
  }

  getCaracteristicasTematicaById(id: number): Observable<Caracteristica[]> {
    const url = `${environment.baseUrl}/tematica/${id}/caracteristicas`;
    return this.net.get<Caracteristica[]>(url);
  }
}
