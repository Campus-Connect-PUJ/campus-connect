import { Component, OnInit } from '@angular/core';
import { TipoAprendizaje } from '../Model/TipoAprendizaje/tipo-aprendizaje';
import { TipoAprendizajeService } from '../Model/TipoAprendizaje/tipo-aprendizaje.service';
import { UsuarioGeneral } from '../Model/UsuarioGeneral/usuario-general';
import { LoginService } from '../services/login.service';

export class estiloAprendizaje{
  letra: string;
  cantidad: number;
  constructor(){

  }
}


@Component({
  selector: 'app-test-aprendizaje',
  templateUrl: './test-aprendizaje.page.html',
  styleUrls: ['./test-aprendizaje.page.scss'],
})
export class TestAprendizajePage implements OnInit {
  respuestas: Array<string> = [];
  aprendizajesExistentes: Array<TipoAprendizaje> = [];
  usuario: UsuarioGeneral;

  constructor(
    private loginService: LoginService,
    private tipoAprendizajeService: TipoAprendizajeService
  ) { }

  ngOnInit() {

    this.tipoAprendizajeService.getTiposAprendizaje().subscribe(
      result => {
        this.aprendizajesExistentes = result;
      },
      error => console.log(error)
    )

  }

  enviar(){
    let estilosAprendizaje: Array<estiloAprendizaje> = [];
    let V: number = 0;
    let A: number = 0;
    let R: number = 0;
    let K: number = 0;

    for(let i=0; i<this.respuestas.length; i++){
      if(this.respuestas[i] == "V"){
        V++;
      }
      else if(this.respuestas[i] == "A"){
        A++;
      }
      else if(this.respuestas[i] == "R"){
        R++;
      }
      else if(this.respuestas[i] == "K"){
        K++;
      }
    }
    

    let estilo = new estiloAprendizaje();
    estilo.cantidad = V;
    estilo.letra = "Visual";
    estilosAprendizaje.push(estilo);
    estilo = new estiloAprendizaje();
    estilo.cantidad = A;
    estilo.letra = "Aural";
    estilosAprendizaje.push(estilo);
    estilo = new estiloAprendizaje();
    estilo.cantidad = R;
    estilo.letra = "LectoEscritura";
    estilosAprendizaje.push(estilo);
    estilo = new estiloAprendizaje();
    estilo.cantidad = K;
    estilo.letra = "Kinestesico";
    estilosAprendizaje.push(estilo);

    estilosAprendizaje.sort(function (a, b) {
      if (a.cantidad > b.cantidad) {
        return -1;
      }
      if (a.cantidad < b.cantidad) {
        return 1;
      }
      // a must be equal to b
      return 0;
    });

    this.obtenerTipos(estilosAprendizaje);
    
  }

  obtenerTipos(estilosAprendizaje: Array<estiloAprendizaje>){
    const idEstilos: Array<number> = [];
    this.usuario = this.loginService.getUser();

    for(let i=0; i<estilosAprendizaje.length; i++){
      if(estilosAprendizaje[i].cantidad >= estilosAprendizaje[1].cantidad){
        for(let j=0; j<this.aprendizajesExistentes.length; j++){
          if(this.aprendizajesExistentes[j].descripcion == estilosAprendizaje[i].letra){
            idEstilos.push(this.aprendizajesExistentes[j].id);
            //Convergente - Kinestesico
            if(this.aprendizajesExistentes[j].id == 2 && !idEstilos.includes(1)){
              idEstilos.push(1)
            }
            //Divergente - Aural
            if(this.aprendizajesExistentes[j].id == 4 && !idEstilos.includes(5)){
              idEstilos.push(5)
            }
            //Asimilador - LectoEscritura
            if(this.aprendizajesExistentes[j].id == 6 && !idEstilos.includes(7)){
              idEstilos.push(7)
            }
            //Acomodador - Visual
            if(this.aprendizajesExistentes[j].id == 3 && !idEstilos.includes(8)){
              idEstilos.push(8)
            }
          }
        }
      }
    }
    console.log("Ids -> ", idEstilos)
    this.guardarTipoAprendizaje(idEstilos);
    
    
  }

  guardarTipoAprendizaje(idEstilos: Array<number>){
    for(let i=0; i<idEstilos.length; i++){
      this.tipoAprendizajeService.agregarTipoAprendizaje(idEstilos[i]).subscribe(
        results => {
          console.log(results)
        },
        error => console.error(error)
      )

      for(let j=0; j<this.aprendizajesExistentes.length; j++){
        if(idEstilos[i] == this.aprendizajesExistentes[j].id){
          this.usuario.estilosAprendizaje.push(this.aprendizajesExistentes[j])
        }
      }
    }

    this.loginService.storeUser(this.usuario, this.loginService.getToken())
  }

}


