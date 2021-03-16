import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Tip, UsuarioGeneral, TipoAprendizaje} from './tips';
import { NetService } from 'src/app/utils/net.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipsService {

  constructor(private net: NetService) { }

  getTips(): Observable<Tip[]>{
    const url = `${environment.baseUrl}/tips`;
    return this.net.get<Tip[]>(url);
  }

  getTipById(id: number): Observable<Tip>{
    const url = `${environment.baseUrl}/tips/${id}`;
    return this.net.get<Tip>(url);
  }

}
