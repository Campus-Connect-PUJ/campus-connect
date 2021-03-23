import { Component, OnInit } from '@angular/core';
import { RespuestaPost, Post, } from '../shared/post'
import { UsuarioGeneral } from "src/app/tips/shared/tips";

@Component({
  selector: 'app-crear',
  templateUrl: './crear.page.html',
  styleUrls: ['./crear.page.scss'],
})
export class CrearPage implements OnInit {
  id: number;
  fecha: Date;
  descripcion: string;
  reportado: boolean;

  usuario: UsuarioGeneral;
  respuestaPost: RespuestaPost;
  constructor() { }

  ngOnInit() {
  }

}
