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
    this.usuario = new UsuarioGeneral(0, "usuario1", "correo@falso.com", 3);

    console.log(this.descripcion, this.titulo)
    this.postCreado.titulo = this.titulo;
    this.postCreado.descripcion = this.descripcion;
    this.postCreado.fecha = new Date("2018-03-16");
    this.postCreado.usuario = this.usuario;

    console.log(this.postCreado)
    this.postService.setForo(this.postCreado);
  }

}
