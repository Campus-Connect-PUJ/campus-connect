import { RespuestaForo } from './../../Model/RespuestasForo/respuestas-foro';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Foro } from 'src/app/Model/Foro/foro';
import { PopoverController, ModalController } from '@ionic/angular';
import { ForoService } from 'src/app/Model/Foro/foro.service';
import { UsuarioGeneral } from 'src/app/Model/UsuarioGeneral/usuario-general';

@Component({
  selector: 'app-foro-detalles',
  templateUrl: './foro-detalles.page.html',
  styleUrls: ['./foro-detalles.page.scss'],
})
export class ForoDetallesPage implements OnInit {
  indice: number = 0;
  color: boolean = false;
  respuestaTexto: string;
  foro: Foro = new Foro("", "", new UsuarioGeneral("", "", 0));
  respuestas: RespuestaForo[];

  constructor(
    private popoverController: PopoverController,
    private modalCtrl: ModalController,
    private activatedRoute: ActivatedRoute,
    private forosService: ForoService
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
        console.log(this.foro)
        console.log(this.foro.respuestas, " ", this.respuestas.length)
      },
      error => console.error(error)
    )
  }

  calificacion(operacion: number){
    console.log(operacion, this.color)
    this.color = !this.color;
    
  }

  crearRespuesta(){
    let respuestanueva: RespuestaForo = new RespuestaForo();
    let respuestas: Array<RespuestaForo> = new Array<RespuestaForo>();

    console.log("Respuesta", this.respuestaTexto)
    respuestanueva.id = this.indice;
    respuestanueva.texto = this.respuestaTexto;
    respuestanueva.usuario = JSON.parse(localStorage.getItem("Usuario"));
    try {
      this.foro.respuestas.push(respuestanueva);
    } catch (error) {
      respuestas.push(respuestanueva);
      console.log(respuestas)
      this.foro.respuestas = respuestas;
    }

    this.forosService.updatePost(respuestanueva).subscribe(
      results => console.log(results),
      error => console.error(error)
    )
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
