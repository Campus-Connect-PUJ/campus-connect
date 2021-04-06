import { Injectable } from '@angular/core';
import { TipoAprendizaje } from './tipo-aprendizaje';
import { NetService } from 'src/app/utils/net.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoAprendizajeService {

  constructor(private net: NetService) { }

  getTiposAprendizaje(): Observable<TipoAprendizaje[]>{
    const url = `${environment.baseUrl}/tipo_aprendizaje/all`;
    return this.net.get<TipoAprendizaje[]>(url);
  }

  getTipoAprendizajeById(id: number): Observable<TipoAprendizaje>{
    const url = `${environment.baseUrl}/tipo_aprendizaje/${id}`;
    return this.net.get<TipoAprendizaje>(url);
  }
}
