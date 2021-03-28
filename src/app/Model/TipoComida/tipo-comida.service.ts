import { Injectable } from '@angular/core';
import { NetService } from 'src/app/utils/net.service';
import { Observable } from 'rxjs';
// import { NetService } from '@utils/net.service';
import { environment } from 'src/environments/environment';
import { TipoComida } from './tipo-comida';

@Injectable({
  providedIn: 'root'
})
export class TipoComidaService {

  constructor(private net: NetService) { }

  getRestaurantes(): Observable<TipoComida[]> {
    const url = `${environment.baseUrl}/TipoComidas`;
    return this.net.get<TipoComida[]>(url);
  }

  getRestauranteById(id: number): Observable<TipoComida> {
    const url = `${environment.baseUrl}/TipoComida/${id}`;
    return this.net.get<TipoComida>(url);
  }
}
