import { Component, OnInit } from '@angular/core';
import { Tip } from 'src/app/Model/Tip/tip';
import { TipsService } from 'src/app/Model/Tip/tips.service';
import { TipoAprendizaje } from 'src/app/Model/TipoAprendizaje/tipo-aprendizaje';
import { TipoAprendizajeService } from 'src/app/Model/TipoAprendizaje/tipo-aprendizaje.service';
import { UsuarioGeneral } from 'src/app/Model/UsuarioGeneral/usuario-general';

@Component({
  selector: 'app-tip-crear',
  templateUrl: './tip-crear.page.html',
  styleUrls: ['./tip-crear.page.scss'],
})
export class TipCrearPage implements OnInit {
  usuario: UsuarioGeneral;
  descripcion: string;
  tipoDeAprendizaje: Array<TipoAprendizaje>= [new TipoAprendizaje()];
  aprendizajesExistentes: Array<TipoAprendizaje> = [];

  tipoAprendizajePrueba: TipoAprendizaje = new TipoAprendizaje();


  tiposDeAprendizajeSeleccionados = [];


  

  tip: Tip = new Tip();
  constructor(private tipsService: TipsService, private tipoAprendizajeService: TipoAprendizajeService) { }

  ngOnInit() {
    this.obtenerTiposDeAprendizaje();
    
    

  }

  obtenerTiposDeAprendizaje(){
    this.tipoAprendizajeService.getTiposAprendizaje().subscribe(
      results => {
        this.aprendizajesExistentes = results;
        console.log(this.aprendizajesExistentes)
      }, error =>console.error(error)
    )
  }

  crearTip(){

    // TODO: quitar esto, ya que se estara sacando el usuario de la BD
    this.usuario = new UsuarioGeneral("usuario1", "correo@falso.com", 3);
    this.usuario.id = 1;

    this.tip.descripcion = this.descripcion;
    this.tip.usuario = this.usuario;
    this.tip.tiposAprendizaje = this.tiposDeAprendizajeSeleccionados;


    this.tipsService.createTip(this.tip)
      .subscribe(
        results => console.log(results),
        error => console.error(error)
      )

  }

  act(){
    console.log(this.aprendizajesExistentes)
  }

  

}
