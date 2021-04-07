import { Pipe, PipeTransform } from '@angular/core';
import { Foro } from '../Model/Foro/foro';

@Pipe({
  name: 'filtroForos'
})
export class FiltroForosPipe implements PipeTransform {

  transform(posts: Foro[], texto: string): Foro[] {
    if(texto.length===0){
      return posts;
    }
    texto = texto.toLowerCase();
    
    return posts.filter(post =>{

      return post.descripcion.toLowerCase().includes(texto) || post.titulo.toLowerCase().includes(texto) || post.usuario.nombre.toLowerCase().includes(texto);
      
    } ); 

  }

}
