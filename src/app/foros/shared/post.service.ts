import { Injectable } from '@angular/core';
import { NetService } from 'src/app/utils/net.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private net: NetService) { }

  getPosts(): Observable<Post[]>{
    const url = `${environment.baseUrl}/posts`;
    return this.net.get<Post[]>(url);
  }

  getPostById(id: number): Observable<Post>{
    const url = `${environment.baseUrl}/post/${id}`;
    return this.net.get<Post>(url);
  }

  createPost(post: Post) {
    console.log("esto se va", post)
    const url = `${environment.baseUrl}/post/${post.usuario.id}`;
    return this.net.post(
      url,
      {
        descripcion: post.descripcion,
        titulo: post.titulo
      }
    );
  }

}
