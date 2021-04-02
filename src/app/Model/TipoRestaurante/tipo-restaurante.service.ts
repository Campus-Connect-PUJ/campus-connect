import { Injectable } from '@angular/core';
import { NetService } from 'src/app/utils/net.service';
import { Observable } from 'rxjs';
// import { NetService } from '@utils/net.service';
import { environment } from 'src/environments/environment';
import { TipoRestaurante } from './tipo-restaurante';
import { Restaurante } from '../Restaurante/restaurante';

@Injectable({
  providedIn: 'root'
})
export class TipoRestauranteService {

  constructor(private net: NetService) { }

  getTipoRestaurantes(): Observable<TipoRestaurante[]> {
    const url = `${environment.baseUrl}/tipo_restaurante/all`;
    return this.net.get<TipoRestaurante[]>(url);
  }

  getTipoRestauranteById(id: number): Observable<TipoRestaurante> {
    const url = `${environment.baseUrl}/tipo_restaurante/${id}`;
    return this.net.get<TipoRestaurante>(url);
  }

  getTipoRestauranteRestaurantes(id: number): Observable<Restaurante[]> {
    const url = `${environment.baseUrl}/tipo_restaurante/${id}/restaurantes`;
    return this.net.get<Restaurante[]>(url);
  }
  
}
