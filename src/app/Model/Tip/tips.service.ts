import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NetService } from 'src/app/utils/net.service';
import { environment } from 'src/environments/environment';
import { Tip } from './tip';

@Injectable({
  providedIn: 'root'
})
export class TipsService {

  constructor(private net: NetService) { }

  getTips(): Observable<Tip[]>{
    const url = `${environment.baseUrl}/tip/all`;
    return this.net.get<Tip[]>(url);
  }

  getTipById(id: number): Observable<Tip>{
    const url = `${environment.baseUrl}/tip/${id}`;
    return this.net.get<Tip>(url);
  }

  createTip(tipEnviar: Tip) {
    const url = `${environment.baseUrl}/tip/${tipEnviar.usuario.id}`;
    console.log("->",tipEnviar.usuario.id, tipEnviar, tipEnviar.tiposAprendizaje)
    return this.net.post(
      url,
      {
        idUsuario: tipEnviar.usuario.id,
        tip: {
          descripcion: tipEnviar.descripcion
        },
        tiposAprendizaje: tipEnviar.tiposAprendizaje
      }
    );
  }


}
