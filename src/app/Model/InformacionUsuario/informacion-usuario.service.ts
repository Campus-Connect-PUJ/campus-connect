import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NetService } from 'src/app/utils/net.service';
import { environment } from 'src/environments/environment';
import { InformacionUsuario } from './informacion-usuario';

@Injectable({
  providedIn: 'root'
})
export class InformacionUsuarioService {

  constructor(private net: NetService) { }

  getInformacionUsuario(): Observable<InformacionUsuario[]> {
    const url = `${environment.baseUrl}/informacion_usuario/all`;
    return this.net.get<InformacionUsuario[]>(url);
  }

  getInformacionUsuarioById(id: number): Observable<InformacionUsuario> {
    const url = `${environment.baseUrl}/informacion_usuario/${id}`;
    return this.net.get<InformacionUsuario>(url);
  }

}
