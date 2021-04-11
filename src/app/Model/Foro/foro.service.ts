import { Injectable } from '@angular/core';
import { NetService } from 'src/app/utils/net.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Foro } from './foro';
import { RespuestaForo } from '../RespuestasForo/respuestas-foro';

@Injectable({
  providedIn: 'root'
})
export class ForoService {

  constructor(private net: NetService) { }

  getPosts(): Observable<Foro[]>{
    const url = `${environment.baseUrl}/foro/all`;
    return this.net.get<Foro[]>(url);
  }

  getPostById(id: number): Observable<Foro>{
    const url = `${environment.baseUrl}/foro/${id}`;
    return this.net.get<Foro>(url);
  }

  createPost(foro: Foro) {
    const url = `${environment.baseUrl}/foro/${foro.usuario.id}`;
    return this.net.post(
      url,
      {
        descripcion: foro.descripcion,
        titulo: foro.titulo
      }
    );
  }

  updatePost(respuesta: RespuestaForo){
    console.log("Aca ", respuesta);
    //const url = `${environment.baseUrl}/foro/${foro.usuario.id}/respuesta`;
    const url = `${environment.baseUrl}/foro/258/respuesta`;
    return this.net.post(
      url, 
      {
        "texto": respuesta.texto,
        "idUsuario": respuesta.usuario.id
      }
    )
  }


}
