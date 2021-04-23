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

  obtenerAsignaturas(): Observable<Eventualidad[]> {
    const url = `${environment.baseUrl}/asignatura/all`;
    return this.net.get<Eventualidad[]>(url);
  }
}
