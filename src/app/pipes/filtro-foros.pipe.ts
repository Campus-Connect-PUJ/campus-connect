import { Pipe, PipeTransform } from '@angular/core';
import { Post } from '../foros/shared/post';

@Pipe({
  name: 'filtroForos'
})
export class FiltroForosPipe implements PipeTransform {

  transform(posts: Post[], texto: string): Post[] {
    if(texto.length===0){
      return posts;
    }
    texto = texto.toLowerCase();
    
    return posts.filter(post =>{

      return post.descripcion.toLowerCase().includes(texto) || post.titulo.toLowerCase().includes(texto) || post.usuario.nombre.toLowerCase().includes(texto);
      
    } ); 

  }

}
