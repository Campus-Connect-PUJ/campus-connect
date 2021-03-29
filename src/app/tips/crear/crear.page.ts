import { Component, OnInit } from '@angular/core';
import { Tip } from 'src/app/Model/Tip/tip';
import { TipsService } from 'src/app/Model/Tip/tips.service';
import { TipoAprendizaje } from 'src/app/Model/TipoAprendizaje/tipo-aprendizaje';
import { UsuarioGeneral } from 'src/app/Model/UsuarioGeneral/usuario-general';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.page.html',
  styleUrls: ['./crear.page.scss'],
})
export class CrearPage implements OnInit {
  usuario: UsuarioGeneral;
  descripcion: string;
  tipoDeAprendizaje: Array<TipoAprendizaje>= [new TipoAprendizaje()];
  tipoAprendizajePrueba: TipoAprendizaje = new TipoAprendizaje();

  tip: Tip = new Tip();

  constructor(private tipsService: TipsService) { }

  ngOnInit() {
  }

  crearTip(){
    console.log("entra")
    // TODO: quitar esto, ya que se estara sacando el usuario de la BD
    this.usuario = new UsuarioGeneral("usuario1", "correo@falso.com", 3);
    this.usuario.id = 0;

    console.log(this.descripcion, this.tipoDeAprendizaje)
    this.tip.descripcion = this.descripcion;
    this.tip.usuario = this.usuario;
    this.tipoAprendizajePrueba.descripcion = "algo";
    this.tipoDeAprendizaje[0] = this.tipoAprendizajePrueba;
    this.tip.tiposAprendizaje = this.tipoDeAprendizaje;
    console.log("tip enviado->", this.tip)


    this.tipsService.createTip(this.tip)
      .subscribe(
        results => console.log(results),
        error => console.error(error)
      )

  }

}
