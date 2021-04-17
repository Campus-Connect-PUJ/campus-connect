import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import { Tip } from 'src/app/Model/Tip/tip';
import { TipoAprendizaje } from 'src/app/Model/TipoAprendizaje/tipo-aprendizaje';
import { TipsService } from 'src/app/Model/Tip/tips.service';
import { UsuarioGeneral } from 'src/app/Model/UsuarioGeneral/usuario-general';


@Component({
  selector: 'app-tip-detalles',
  templateUrl: './tip-detalles.page.html',
  styleUrls: ['./tip-detalles.page.scss'],
})
export class TipDetallesPage implements OnInit {

  tip: Tip = new Tip();
  tiposDeAprendizaje: TipoAprendizaje[] = [];
  indice: number;
  user: UsuarioGeneral;

  constructor(
    private tipsService: TipsService,
    private activatedRoute: ActivatedRoute,
    public navCtrl: NavController
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

    this.user = JSON.parse(localStorage.getItem("Usuario"));
    this.indice = this.user.id;
    /*
    this.tipsService.agregarTipGustado(this.indice, this.tip.id).subscribe(
      results => console.log(results),
      error => console.error(error)
    );
      */
    this.calificacionTip(voto, this.tip.id);

  }


  calificacionTip(operacion: number, idTip: number){
    let a: number;
    a=1
    if(operacion === 1){
      this.tipsService.agregarTipGustado(a,this.tip.id).subscribe(
        results => console.log(results),
        error => console.error(error)
      )
    }
    else{
      this.tipsService.agregarTipNoGustado(a,this.tip.id).subscribe(
        results => console.log(results),
        error => console.error(error)
      )
    }
  }

}
