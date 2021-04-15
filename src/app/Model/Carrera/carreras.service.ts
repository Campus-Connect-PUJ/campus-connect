import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NetService } from 'src/app/utils/net.service';
import { environment } from 'src/environments/environment';
import { Carrera } from './carrera';

@Injectable({
  providedIn: 'root'
})
export class CarrerasService {

  constructor(private net: NetService) { }

  getCarreras(): Observable<Carrera[]> {
    const url = `${environment.baseUrl}/facultad/all`;
    return this.net.get<Carrera[]>(url);
  }
}
