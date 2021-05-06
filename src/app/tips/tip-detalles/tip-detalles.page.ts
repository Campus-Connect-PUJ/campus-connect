import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import { Tip } from 'src/app/Model/Tip/tip';
import { TipoAprendizaje } from 'src/app/Model/TipoAprendizaje/tipo-aprendizaje';
import { TipsService } from 'src/app/Model/Tip/tips.service';
import { UsuarioGeneral } from 'src/app/Model/UsuarioGeneral/usuario-general';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-tip-detalles',
  templateUrl: './tip-detalles.page.html',
  styleUrls: ['./tip-detalles.page.scss'],
})
export class TipDetallesPage implements OnInit {

  tip: Tip = new Tip();
  tiposDeAprendizaje: TipoAprendizaje[] = [];
  indice: number;
  votoPositivo = false;
  votoNegativo = false;
  user: UsuarioGeneral;

  constructor(
    private tipsService: TipsService,
    private activatedRoute: ActivatedRoute,
    public navCtrl: NavController,
    private loginService: LoginService,
    public toastCtrl: ToastController,
  ) { 

  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paraMap => {
      const recipeId = paraMap.get('tipId')
      this.indice = Number(recipeId);
      this.findTip(this.indice);
    })
  }

  findTip(numeroTip: number){
    this.tipsService.getTipById(numeroTip).subscribe(
      results => {
        this.tip = results;
        this.tiposDeAprendizaje = this.tip.tiposAprendizaje;
      },
      error => console.error(error)
    )
  }

  votar(voto: number){
    this.user = this.loginService.getUser();
    this.calificacionTip(voto);
  }

  existeTip(tips: Tip[], tip: Tip){
    let existe = false;
    for(let i=0; i<tips.length; i++){
      if(tips[i].id == tip.id){
        existe = true;
      }
    }

    return existe;
  }


  calificacionTip(operacion: number){
    let mensaje = " ";
    if(operacion == 1 && !this.existeTip(this.user.tipsGustados, this.tip)){
      this.tipsService.agregarTipGustado(this.tip.id).subscribe(
        results => {
          console.log(results)
        },
        error => console.error(error)
      )
      this.user.tipsGustados.push(this.tip);
      this.tip.puntaje = this.tip.puntaje + operacion;
      if(this.existeTip(this.user.tipsNoGustados, this.tip)){
        this.user.tipsNoGustados.splice(this.buscarIndice(this.user.tipsNoGustados, this.tip), 1)
      }
      // TODO: arreglar
    }
    else if(operacion == -1 && !this.existeTip(this.user.tipsNoGustados, this.tip)){
      this.tipsService.agregarTipNoGustado(this.tip.id).subscribe(
        results => console.log(results),
        error => console.error(error)
      )
      this.user.tipsNoGustados.push(this.tip);
      this.tip.puntaje = this.tip.puntaje + operacion;
      if(this.existeTip(this.user.tipsGustados, this.tip)){
        this.user.tipsGustados.splice(this.buscarIndice(this.user.tipsNoGustados, this.tip), 1)
      }
    }
    else{
      if(operacion == 1 && this.existeTip(this.user.tipsGustados, this.tip)){
        mensaje = "Ya ha agregado este tip a tips gustados"
      }
      else if(operacion == -1 && this.existeTip(this.user.tipsNoGustados, this.tip)){
        mensaje = "Ya ha agregado este tip a tips no gustados"
      }
      this.presentToast(mensaje);
    }

    this.loginService.storeUser(this.user, this.loginService.getToken())
  
  }


  async presentToast(mensaje){
    const toast = await this.toastCtrl.create(
      {
        message: mensaje,
        duration: 2000
      }
    );
    toast.present();
  }

  buscarIndice(tips: Tip[], tip: Tip){
    let indice = 0;
    for(let i=0; i<tips.length; i++){
      if(tips[i].id == tip.id){
        indice = i;
      }
    }

    return indice;
  }

}
