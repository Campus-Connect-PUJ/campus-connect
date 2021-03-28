import { Injectable } from '@angular/core';
import { NetService } from 'src/app/utils/net.service';
import { Tematica } from './tematica';
import { Observable } from 'rxjs';
// import { NetService } from '@utils/net.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TematicaService {

  constructor(private net: NetService) { }

  getRestaurantes(): Observable<Tematica[]> {
    const url = `${environment.baseUrl}/restaurantes`;
    return this.net.get<Tematica[]>(url);
  }

  getRestauranteById(id: number): Observable<Tematica> {
    const url = `${environment.baseUrl}/restaurante/${id}`;
    return this.net.get<Tematica>(url);
  }
}
