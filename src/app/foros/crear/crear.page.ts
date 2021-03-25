import { Component, OnInit } from '@angular/core';
import { RespuestaPost, Post } from '../shared/post'
import { UsuarioGeneral } from "src/app/tips/shared/tips";
import { PostService } from '../shared/post.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.page.html',
  styleUrls: ['./crear.page.scss'],
})
export class CrearPage implements OnInit {
  id: number;
  fecha: Date;
  titulo: string;
  descripcion: string;
  reportado: boolean;

  usuario: UsuarioGeneral;
  postCreado: Post = new Post("", "", null);

  constructor(private postService: PostService) { }

  ngOnInit() {
  }

  crearForo(){

    // TODO: quitar esto, ya que se estara sacando el usuario de la BD
    this.usuario = new UsuarioGeneral("usuario1", "correo@falso.com", 3);
    this.usuario.id = 0;

    console.log(this.descripcion, this.titulo)
    this.postCreado.titulo = this.titulo;
    this.postCreado.descripcion = this.descripcion;
    // this.postCreado.fecha = new Date("2018-03-16");
    this.postCreado.usuario = this.usuario;

    console.log(this.postCreado)
    this.postService.createPost(this.postCreado)
      .subscribe(
        results => console.log(results),
        error => console.error(error)
      )

  }
}
