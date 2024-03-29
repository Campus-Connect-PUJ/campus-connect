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
    const url = `${environment.baseUrl}/tip`;
    console.log(tipEnviar)
    return this.net.post(
      url,
      {
        idUsuario: tipEnviar.usuario.id,
        tip: {
          descripcion: tipEnviar.descripcion
        },
        tiposAprendizaje: tipEnviar.tiposAprendizaje,
        exigencia: tipEnviar.nivelExigencia
      }
    );
  }

  borrarTip(idTip: number){
    const url = `${environment.baseUrl}/tip/borrarTip/${idTip}`;
    return this.net.put(url, {})
  }

  agregarTipGustado(idTip: number){
    const url = `${environment.baseUrl}/tip/tipsGustados/${idTip}`;
    return this.net.put(
      url,
      {}
    );
  }

  agregarTipNoGustado(idTip: number){
    const url = `${environment.baseUrl}/tip/tipsNoGustados/${idTip}`;
    return this.net.put(
      url,
      {}
    );
  }


  sumarVoto(indiceUsuario: number, indiceTip: number){
    const url = `${environment.baseUrl}/tip/tipsGustados/${indiceUsuario}/${indiceTip}`;
    return this.net.put(
      url,{}
      )
    
  }

  restarVoto(indice: number){
    const url = `${environment.baseUrl}/tip/restar/${indice}`;
    return this.net.put(
      url,{}
      )
  }

  obtenerRecomendacion(){
    const url = `${environment.baseUrl}/reglas/usuario`;
    return this.net.get<Tip>(
      url
    )

  }


}
