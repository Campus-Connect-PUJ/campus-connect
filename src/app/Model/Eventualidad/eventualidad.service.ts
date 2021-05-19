import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NetService } from 'src/app/utils/net.service';
import { environment } from 'src/environments/environment';
import { Eventualidad } from './eventualidad';

@Injectable({
  providedIn: "root",
})
export class EventualidadService {
  constructor(private net: NetService) {}

  obtenerEventualidades(): Observable<Eventualidad[]> {
    const url = `${environment.baseUrl}/eventualidad/all`;
    return this.net.get<Eventualidad[]>(url);
  }

  createEventualidad(evEnviar: Eventualidad) {
    const url = `${environment.baseUrl}/eventualidad`;
    console.log(
      "->",
      evEnviar.descripcion,
      evEnviar.longitud,
      evEnviar.latitud,
      evEnviar.tipo
    );
    return this.net.post(url, {
      descripcion: evEnviar.descripcion,
      tipo: evEnviar.tipo.valueOf(),
      longitud: evEnviar.longitud,
      latitud:evEnviar.latitud
    });
  }
}
