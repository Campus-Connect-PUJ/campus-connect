import { Component, OnInit } from '@angular/core';
import { UsuarioGeneral } from 'src/app/Model/UsuarioGeneral/usuario-general';
import { LoginService } from "src/app/services/login.service";
import { TipoAprendizajeService } from "src/app/Model/TipoAprendizaje/tipo-aprendizaje.service"
import { TipoAprendizaje } from 'src/app/Model/TipoAprendizaje/tipo-aprendizaje';
import { UsuarioGeneralService } from 'src/app/Model/UsuarioGeneral/usuario-general.service'

@Component({
  selector: 'app-agregar-tipo-aprendizaje',
  templateUrl: './agregar-tipo-aprendizaje.page.html',
  styleUrls: ['./agregar-tipo-aprendizaje.page.scss'],
})
export class AgregarTipoAprendizajePage implements OnInit {
  usuario: UsuarioGeneral;
  aprendizajesExistentes: Array<TipoAprendizaje> = [];
  tiposDeAprendizajeSeleccionados = [];
  tiposDeAprendizajeUsuario = [];

  constructor(private loginService: LoginService,
    private tipoAprendizajeService: TipoAprendizajeService,
    private usuarioService: UsuarioGeneralService
    ) { }

  ngOnInit() {
    this.obtenerTiposDeAprendizajeUsuario();
    this.obtenerTiposDeAprendizaje();
  }

  obtenerTiposDeAprendizajeUsuario(){
    this.usuario = this.loginService.getUser();
    this.usuarioService.getUsuario(this.usuario.id).subscribe(
      results => {
        this.usuario = results;
        this.tiposDeAprendizajeUsuario = this.usuario.estilosAprendizaje;
        console.log("Los del usuario", this.tiposDeAprendizajeUsuario)
      }, error => console.error(error)
    )
    //this.usuarioService.

    //this.tiposDeAprendizajeSeleccionados = this.usuario.estilosAprendizaje;
    //console.log("user", this.usuario);
  }

  obtenerTiposDeAprendizaje(){
    this.tipoAprendizajeService.getTiposAprendizaje().subscribe(
      results => {
        this.aprendizajesExistentes = results;
        console.log(this.aprendizajesExistentes)
      }, error =>console.error(error)
    )
  }

  
  agregarTipo(){
    let mensaje = "Se publico el foro";
    // TODO: quitar esto, ya que se estara sacando el usuario de la BD
    this.usuario = this.loginService.getUser();
    for(let i = 0; i < this.tiposDeAprendizajeSeleccionados.length; i++){
      console.log("aa");
      this.tipoAprendizajeService.agregarTipoAprendizaje(this.usuario.id, this.tiposDeAprendizajeSeleccionados[i]).subscribe(
        results => console.log(results),
        error => console.error(error)
      )

      for(let j=0; j< this.aprendizajesExistentes.length; j++){


        if(this.aprendizajesExistentes[j].id === this.tiposDeAprendizajeSeleccionados[i]){
          if(!this.tiposDeAprendizajeUsuario.includes(this.aprendizajesExistentes[j])){
            this.tiposDeAprendizajeUsuario.push(this.aprendizajesExistentes[j]);
          }
          
        }
      }

    }
    

    console.log(mensaje);

  }

}
