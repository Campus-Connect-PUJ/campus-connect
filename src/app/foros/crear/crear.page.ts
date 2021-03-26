import { Component, OnInit } from '@angular/core';
import { Foro } from 'src/app/Model/Foro/foro';
import { ForoService } from 'src/app/Model/Foro/foro.service';
import { UsuarioGeneral } from 'src/app/Model/UsuarioGeneral/usuario-general';

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
  foroCreado: Foro = new Foro("", "", null);

  constructor(private foroService: ForoService) { }

  ngOnInit() {
  }

  crearForo(){

    // TODO: quitar esto, ya que se estara sacando el usuario de la BD
    this.usuario = new UsuarioGeneral("usuario1", "correo@falso.com", 3);
    this.usuario.id = 0;

    console.log(this.descripcion, this.titulo)
    this.foroCreado.titulo = this.titulo;
    this.foroCreado.descripcion = this.descripcion;
    // this.postCreado.fecha = new Date("2018-03-16");
    this.foroCreado.usuario = this.usuario;

    console.log(this.foroCreado)
    this.foroService.createPost(this.foroCreado)
      .subscribe(
        results => console.log(results),
        error => console.error(error)
      )

  }
}
