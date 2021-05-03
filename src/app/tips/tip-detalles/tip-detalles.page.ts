import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
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

  constructor(
    private tipsService: TipsService,
    private activatedRoute: ActivatedRoute,
    public navCtrl: NavController,
    private loginService: LoginService
  ) { 

  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paraMap => {
      const recipeId = paraMap.get('tipId')
      this.indice = Number(recipeId);
      console.log(this.indice)
    })
    this.findTip(this.indice);
  }

  findTip(numeroTip: number){
    this.tipsService.getTipById(numeroTip).subscribe(
      results => {
        this.tip = results;
        //this.tiposDeAprendizaje = results.tipoAprendizaje;
      },
      error => console.error(error)
    )
    
  }

  votar(voto: number){
    console.log(voto)

    this.calificacionTip(voto);

    if(voto == 1 && !this.votoPositivo){
      this.votoPositivo = true;
      this.votoNegativo = false;
      this.tip.puntaje = this.tip.puntaje + voto;
    }
    else if(voto == -1 && !this.votoNegativo){
      this.votoNegativo = true;
      this.votoPositivo = false;
      this.tip.puntaje = this.tip.puntaje + voto;
    }

  }


  calificacionTip(operacion: number){
    if(operacion === 1){
      this.tipsService.agregarTipGustado(this.tip.id).subscribe(
        results => console.log(results),
        error => console.error(error)
      )

    }
    else{
      this.tipsService.agregarTipNoGustado(this.tip.id).subscribe(
        results => console.log(results),
        error => console.error(error)
      )
    }
  }

}
