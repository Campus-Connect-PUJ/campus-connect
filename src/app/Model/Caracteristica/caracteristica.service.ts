import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NetService } from 'src/app/utils/net.service';
import { environment } from 'src/environments/environment';
import { Tematica } from '../Tematica/tematica';
import { UsuarioGeneral } from '../UsuarioGeneral/usuario-general';
import { Caracteristica } from './caracteristica';

@Injectable({
  providedIn: 'root'
})
export class CaracteristicaService {

  constructor(private net: NetService) { }

  getCaracteristicas(): Observable<Caracteristica[]> {
    const url = `${environment.baseUrl}/caracteristica/all`;
    return this.net.get<Caracteristica[]>(url);
  }

  getCaracteristicaById(id: number): Observable<Caracteristica> {
    const url = `${environment.baseUrl}/caracteristica/${id}`;
    return this.net.get<Caracteristica>(url);
  }

  getUsuariosCaracteristicaById(id: number): Observable<UsuarioGeneral[]> {
    const url = `${environment.baseUrl}/caracteristica/${id}/usuarios`;
    return this.net.get<UsuarioGeneral[]>(url);
  }

  getTematicasCaracteristicaById(id: number): Observable<Tematica[]> {
    const url = `${environment.baseUrl}/caracteristica/${id}/tematicas`;
    return this.net.get<Tematica[]>(url);
  }
}
