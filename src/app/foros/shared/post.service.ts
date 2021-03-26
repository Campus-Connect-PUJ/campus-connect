import { Injectable } from '@angular/core';
import { NetService } from 'src/app/utils/net.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Foro } from '../../Model/Foro.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private net: NetService) { }

  getPosts(): Observable<Foro[]>{
    const url = `${environment.baseUrl}/foros`;
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

}
