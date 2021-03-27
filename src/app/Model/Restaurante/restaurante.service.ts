import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { NetService } from '@utils/net.service';
import { environment } from 'src/environments/environment';
import { NetService } from 'src/app/utils/net.service';
import { Restaurante } from './restaurante';

@Injectable({
  providedIn: 'root'
})
export class RestauranteService {

  constructor(private net: NetService) { }

  getRestaurantes(): Observable<Restaurante[]> {
    const url = `${environment.baseUrl}/restaurantes`;
    return this.net.get<Restaurante[]>(url);
  }

  getRestauranteById(id: number): Observable<Restaurante> {
    const url = `${environment.baseUrl}/restaurante/${id}`;
    return this.net.get<Restaurante>(url);
  }
}
