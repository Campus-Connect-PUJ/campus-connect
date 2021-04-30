import { Injectable } from '@angular/core';
import { NetService } from 'src/app/utils/net.service';
import { Observable } from 'rxjs';
// import { NetService } from '@utils/net.service';
import { environment } from 'src/environments/environment';
import { RegimenAlimenticio } from './regimen-alimenticio';
import { Restaurante } from '../Restaurante/restaurante';
import { UsuarioGeneral } from '../UsuarioGeneral/usuario-general';

@Injectable({
  providedIn: 'root'
})
export class RegimenAlimenticioService {

  constructor(private net: NetService) { }

  getRegimenAlimenticios(): Observable<RegimenAlimenticio[]> {
    const url = `${environment.baseUrl}/regimen_alimenticio/all`;
    return this.net.get<RegimenAlimenticio[]>(url);
  }

  getRegimenAlimenticioById(id: number): Observable<RegimenAlimenticio> {
    const url = `${environment.baseUrl}/regimen_alimenticio/${id}`;
    return this.net.get<RegimenAlimenticio>(url);
  }

  getRestaurantesRegimenAlimenticioById(id: number): Observable<Restaurante[]> {
    const url = `${environment.baseUrl}/regimen_alimenticio/${id}/restaurantes`;
    return this.net.get<Restaurante[]>(url);
  }

  getUsuariosRegimenAlimenticioById(id: number): Observable<UsuarioGeneral[]> {
    const url = `${environment.baseUrl}/regimen_alimenticio/${id}/usuarios`;
    return this.net.get<UsuarioGeneral[]>(url);
  }
  
}
