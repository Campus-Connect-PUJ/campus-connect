import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { NetService } from '@utils/net.service';
import { environment } from 'src/environments/environment';
import { NetService } from 'src/app/utils/net.service';
import { Restaurante } from './restaurante';
import { TipoRestaurante } from '../TipoRestaurante/tipo-restaurante';
import { TipoComida } from '../TipoComida/tipo-comida';
import { ReseniaRestaurante } from '../ReseniaRestaurante/resenia-restaurante';
import { RegimenAlimenticio } from '../RegimenAlimenticio/regimen-alimenticio';
import { RegimenAlimenticioService } from '../RegimenAlimenticio/regimen-alimenticio.service';

@Injectable({
  providedIn: 'root'
})
export class RestauranteService {

  constructor(private net: NetService) { }

  getRestaurantes(): Observable<Restaurante[]> {
    const url = `${environment.baseUrl}/restaurante/all`;
    return this.net.get<Restaurante[]>(url);
  }

  getRestauranteById(id: number): Observable<Restaurante> {
    const url = `${environment.baseUrl}/restaurante/${id}`;
    return this.net.get<Restaurante>(url);
  }

  getRestauranteTipos(id: number): Observable<TipoRestaurante[]> {
    const url = `${environment.baseUrl}/restaurante/${id}/tipos`;
    return this.net.get<TipoRestaurante[]>(url);
  }

  getRestauranteTiposComida(id: number): Observable<TipoComida[]> {
    const url = `${environment.baseUrl}/restaurante/${id}/tipos_comida"`;
    return this.net.get<TipoComida[]>(url);
  }

  getRestauranteResenhas(id: number): Observable<ReseniaRestaurante[]> {
    const url = `${environment.baseUrl}/restaurante/${id}}/resenhas`;
    return this.net.get<ReseniaRestaurante[]>(url);
  }

  getRestauranteRegimenAlimenticio(id: number): Observable<RegimenAlimenticio[]> {
    const url = `${environment.baseUrl}/restaurante/${id}}/regimenes_alimenticios`;
    return this.net.get<RegimenAlimenticio[]>(url);
  }
}
