import { RespuestaForo } from './../../Model/RespuestasForo/respuestas-foro';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Foro } from 'src/app/Model/Foro/foro';
import { PopoverController, ModalController, ToastController } from '@ionic/angular';
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

  usuarioActual: UsuarioGeneral;

  constructor(
    private popoverController: PopoverController,
    private modalCtrl: ModalController,
    private activatedRoute: ActivatedRoute,
    private forosService: ForoService,
    private loginService: LoginService,
    public toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paraMap => {
      const recipeId = paraMap.get('foroId')
      this.indice = Number(recipeId);
      this.usuarioActual = this.loginService.getUser();
      this.findForo(this.indice);
    })
  }

  findForo(indice: number){
    this.forosService.getPostById(indice).subscribe(
      result => {
        this.foro = result;
        this.respuestas = this.foro.respuestas;
        this.respuestas = this.organizarRespuestas(this.respuestas);
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
    this.color = !this.color;
  }

  calificacionForo(operacion: number){
    this.color = !this.color;

    let mensaje = " ";
    if(operacion === 1 && !this.existeUsuario(this.foro.usuariosGustaron, this.usuarioActual)){
      this.forosService.sumarVoto(this.foro.id).subscribe(
        results => console.log(results),
        error => console.error(error)
      )

      if(this.existeUsuario(this.foro.usuariosNoGustaron, this.usuarioActual)){
        this.foro.usuariosNoGustaron.splice(this.buscarIndice(this.foro.usuariosNoGustaron, this.usuarioActual), 1)
        this.foro.puntaje = this.foro.puntaje+1;
      }
      else{
        this.foro.usuariosGustaron.push(this.usuarioActual);
        this.foro.puntaje = this.foro.puntaje+1;
      }
    }
    else if(operacion == -1 && !this.existeUsuario(this.foro.usuariosNoGustaron, this.usuarioActual)){
      this.forosService.restarVoto(this.foro.id).subscribe(
        results => console.log(results),
        error => console.error(error)
      )

      if(this.existeUsuario(this.foro.usuariosGustaron, this.usuarioActual)){
        this.foro.usuariosGustaron.splice(this.buscarIndice(this.foro.usuariosGustaron, this.usuarioActual), 1)
        this.foro.puntaje = this.foro.puntaje-1;
      }
      else{
        this.foro.usuariosNoGustaron.push(this.usuarioActual);
        this.foro.puntaje = this.foro.puntaje-1;
      }
    }
    else{
      mensaje = "Ya ha calificado este foro";
      this.presentToast(mensaje);
    }
  }

  
  async presentToast(mensaje){
    const toast = await this.toastCtrl.create(
      {
        message: mensaje,
        duration: 1000
      }
    );
    toast.present();
  }

  buscarIndice(tips: UsuarioGeneral[], tip: UsuarioGeneral){
    let indice = 0;
    for(let i=0; i<tips.length; i++){
      if(tips[i].email == tip.email){
        indice = i;
      }
    }

    return indice;
  }

  existeUsuario(usuarios: UsuarioGeneral[], usuario: UsuarioGeneral){
    let existe = false;

    for(let i=0; i<usuarios.length; i++){
      if(usuarios[i].email == usuario.email){
        existe = true;
        return existe;
      }
    }

    return existe;
  }

  
  calificacionRespuestas(operacion: number, id: number, indice: number){
    this.color = !this.color;
    console.log("el id",id, " - ", indice, " Cantidad total: ", this.respuestas.length);
    let mensaje = " ";
    if(operacion === 1 && !this.existeUsuario(this.respuestas[indice].usuariosGustaron, this.usuarioActual)){
      this.forosService.sumarVotoRespuesta(id).subscribe(
        results => console.log(results),
        error => console.error(error)
      )
      if(this.existeUsuario(this.respuestas[indice].usuariosNoGustaron, this.usuarioActual)){
        this.respuestas[indice].usuariosNoGustaron.splice(this.buscarIndice(this.respuestas[indice].usuariosNoGustaron, this.usuarioActual), 1)
        this.respuestas[indice].puntaje = this.respuestas[indice].puntaje+1;
      }
      else{
        this.respuestas[indice].usuariosGustaron.push(this.usuarioActual);
        this.respuestas[indice].puntaje = this.respuestas[indice].puntaje+1;
      }
    }
    else if(operacion == -1 && !this.existeUsuario(this.respuestas[indice].usuariosNoGustaron, this.usuarioActual)){
      this.forosService.restarVotoRespuesta(id).subscribe(
        results => console.log(results),
        error => console.error(error)
      )

      if(this.existeUsuario(this.respuestas[indice].usuariosGustaron, this.usuarioActual)){
        this.respuestas[indice].usuariosGustaron.splice(this.buscarIndice(this.respuestas[indice].usuariosGustaron, this.usuarioActual), 1)
        this.respuestas[indice].puntaje = this.foro.puntaje-1;
      }
      else{
        this.respuestas[indice].usuariosNoGustaron.push(this.usuarioActual);
        this.respuestas[indice].puntaje = this.respuestas[indice].puntaje-1;
      }
    }
    else{
      mensaje = "Ya ha calificado esta respuesta";
      this.presentToast(mensaje);
    }


  }

  crearRespuesta(){
    const respuestanueva: RespuestaForo = new RespuestaForo();
    const respuestas: Array<RespuestaForo> = new Array<RespuestaForo>();

    respuestanueva.id = this.indice;
    respuestanueva.texto = this.respuestaTexto;
    respuestanueva.usuario = this.loginService.getUser();
    respuestanueva.puntaje = 0;
    try {
      this.foro.respuestas.push(respuestanueva);
      this.respuestaTexto = "";
    } catch (error) {
      respuestas.push(respuestanueva);

    }

    this.forosService.agregarRespuesta(respuestanueva, this.foro.id).subscribe(
      results => console.log("Se agrego respuesta"),
      error => console.error(error)
    )
    

    this.findForo(this.indice);
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
