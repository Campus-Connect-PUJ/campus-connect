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
    const url = `${environment.baseUrl}/tips`;
    return this.net.get<Tip[]>(url);
  }

  getTipById(id: number): Observable<Tip>{
    const url = `${environment.baseUrl}/tip/${id}`;
    return this.net.get<Tip>(url);
  }

  createTip(tip: Tip) {
    const url = `${environment.baseUrl}/tip/${tip.usuario.id}`;
    return this.net.post(
      url,
      {
        descripcion: tip.descripcion,
        //tiposAprendizaje: tip.tiposAprendizaje
      }
    );
  }


}
