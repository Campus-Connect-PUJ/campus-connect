import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NetService } from 'src/app/utils/net.service';
import { environment } from 'src/environments/environment';
import { RespuestaForo } from './respuestas-foro';

@Injectable({
  providedIn: 'root'
})
export class RespuestasForoService {

  constructor(private net: NetService) { }

  getRespuestasForoById(id: number): Observable<RespuestaForo[]>{
    const url = `${environment.baseUrl}/respuestaForo/usuario/${id}`;
    return this.net.get<RespuestaForo[]>(url);
  }

  borrarRespuesta(idUsuario: number, idRespuesta: number){
    const url = `${environment.baseUrl}/foro/borrarRespuesta/${idRespuesta}`;
    return this.net.put(url, {})
  }

}
