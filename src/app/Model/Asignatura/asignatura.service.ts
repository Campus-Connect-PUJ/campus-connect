import { Asignatura } from './asignatura';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NetService } from 'src/app/utils/net.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AsignaturaService {

  constructor(private net: NetService) { }


  obtenerAsignaturas(): Observable<Asignatura[]>{
    const url = `${environment.baseUrl}/asignatura/all`;
    return this.net.get<Asignatura[]>(url);

  }

  



}
