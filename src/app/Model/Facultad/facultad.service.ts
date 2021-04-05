import { Injectable } from '@angular/core';
import { NetService } from 'src/app/utils/net.service';
import { Observable } from 'rxjs';
// import { NetService } from '@utils/net.service';
import { environment } from 'src/environments/environment';
import { Facultad } from './facultad';
import { GrupoEstudiantil } from '../GrupoEstudiantil/grupo-estudiantil';

@Injectable({
  providedIn: 'root'
})
export class FacultadService {

  constructor(private net: NetService) { }

  getFacultades(): Observable<Facultad[]> {
    const url = `${environment.baseUrl}/facultad/all`;
    return this.net.get<Facultad[]>(url);
  }

  getFacultadById(id: number): Observable<Facultad> {
    const url = `${environment.baseUrl}/facultad/${id}`;
    return this.net.get<Facultad>(url);
  }

  getGruposEstudiantilesByIdFacultad(id:number): Observable<GrupoEstudiantil[]>{
    const url = `${environment.baseUrl}/facultad/${id}/grupos_estudiantiles`;
    return this.net.get<GrupoEstudiantil[]>(url);
  }
}
