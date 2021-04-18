import { RespuestaForo } from './../../Model/RespuestasForo/respuestas-foro';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Foro } from 'src/app/Model/Foro/foro';
import { PopoverController, ModalController } from '@ionic/angular';
import { ForoService } from 'src/app/Model/Foro/foro.service';
import { UsuarioGeneral } from 'src/app/Model/UsuarioGeneral/usuario-general';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-foro-detalles',
  templateUrl: './foro-detalles.page.html',
  styleUrls: ['./foro-detalles.page.scss'],
})
export class ForoDetallesPage implements OnInit {
  indice: number = 0;
  color: boolean = false;
  respuestaTexto: string;
  foro: Foro = new Foro("", "", new UsuarioGeneral("", "", ""));
  respuestas: RespuestaForo[];

  constructor(
    private popoverController: PopoverController,
    private modalCtrl: ModalController,
    private activatedRoute: ActivatedRoute,
    private forosService: ForoService,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paraMap => {
      const recipeId = paraMap.get('foroId')
      this.indice = Number(recipeId);
      console.log("indice", this.indice)
      this.findForo(this.indice);
    })
  }

  findForo(indice: number){
    this.forosService.getPostById(indice).subscribe(
      result => {
        this.foro = result;
        this.respuestas = this.foro.respuestas;

        this.respuestas = this.organizarRespuestas(this.respuestas);

        console.log(this.foro)
        console.log(this.foro.respuestas, " ", this.respuestas.length)
      },
      error => console.error(error)
    )
  }

  organizarRespuestas(respuestas: RespuestaForo[]){
    let respuestasOrdenadas = respuestas;

    respuestasOrdenadas.sort();
    console.log("Ordenasa ",respuestasOrdenadas)

    respuestasOrdenadas.sort(function (a, b) {
      if (a.puntaje > b.puntaje) {
        return -1;
      }
      if (a.puntaje < b.puntaje) {
        return 1;
      }
      // a must be equal to b
      return 0;
    });

    return respuestasOrdenadas;
  }

  calificacion(operacion: number){
    console.log(operacion, this.color)
    this.color = !this.color;
  }

  calificacionForo(operacion: number){
    this.color = !this.color;

    if(operacion === 1){
      this.forosService.sumarVoto(this.foro.id).subscribe(
        results => console.log(results),
        error => console.error(error)
      )
      this.foro.puntaje = this.foro.puntaje+1;
    }
    else{
      this.forosService.restarVoto(this.foro.id).subscribe(
        results => console.log(results),
        error => console.error(error)
      )
      this.foro.puntaje = this.foro.puntaje-1;
    }
  }

  
  calificacionRespuestas(operacion: number, id: number, indice: number){
    this.color = !this.color;
    console.log("el id",id, " - ", indice, " Cantidad total: ", this.respuestas.length);
    if(operacion === 1){
      this.forosService.sumarVotoRespuesta(id).subscribe(
        results => console.log(results),
        error => console.error(error)
      )
      console.log("Respuestas: ", this.respuestas.length, this.respuestas)
      this.respuestas[indice].puntaje = this.respuestas[indice].puntaje+1;
    }
    else{
      this.forosService.restarVotoRespuesta(id).subscribe(
        results => console.log(results),
        error => console.error(error)
      )
      this.respuestas[indice].puntaje = this.respuestas[indice].puntaje-1;
    }
  }

  crearRespuesta(){
    let respuestanueva: RespuestaForo = new RespuestaForo();
    let respuestas: Array<RespuestaForo> = new Array<RespuestaForo>();

    console.log("Respuesta", this.respuestaTexto)
    respuestanueva.id = this.indice;
    respuestanueva.texto = this.respuestaTexto;
    respuestanueva.usuario = this.loginService.getUser();
    try {
      this.foro.respuestas.push(respuestanueva);
    } catch (error) {
      respuestas.push(respuestanueva);
      console.log(respuestas)
    }

    console.log("->", respuestanueva, " - ",this.foro.id);
    this.forosService.agregarRespuesta(respuestanueva, this.foro.id).subscribe(
      results => console.log("Se agrego respuesta"),
      error => console.error(error)
    )
    
    console.log("respuestas1" , this.respuestas);
    console.log("respuestas2" , this.respuestas);
  }

  /*
  async mostrarPop(evento){

    const popover = await this.modalCtrl.create({
      component: ContestarComponent,
      cssClass: 'estilosContestar',
      
    });
    await popover.present();

    const {data} = await popover.onWillDismiss();
    console.log(data)
  }
*/
}
