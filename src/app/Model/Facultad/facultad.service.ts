import { Injectable } from '@angular/core';
import { NetService } from 'src/app/utils/net.service';
import { Observable } from 'rxjs';
// import { NetService } from '@utils/net.service';
import { environment } from 'src/environments/environment';
import { Facultad } from './facultad';

@Injectable({
  providedIn: 'root'
})
export class FacultadService {

  constructor(private net: NetService) { }

  getRestaurantes(): Observable<Facultad[]> {
    const url = `${environment.baseUrl}/facultad`;
    return this.net.get<Facultad[]>(url);
  }

  getRestauranteById(id: number): Observable<Facultad> {
    const url = `${environment.baseUrl}/facultad/${id}`;
    return this.net.get<Facultad>(url);
  }
}
