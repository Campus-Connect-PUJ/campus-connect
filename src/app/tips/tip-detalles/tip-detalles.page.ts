import { Component, OnInit } from '@angular/core';
import { Tip } from '../../Model/Tip.model';
import { TipoAprendizaje } from '../../Model/TipoAprendizaje.model';
import { TipsService } from '../shared/tips.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-tip-detalles',
  templateUrl: './tip-detalles.page.html',
  styleUrls: ['./tip-detalles.page.scss'],
})
export class TipDetallesPage implements OnInit {

  tip: Tip = new Tip();
  tiposDeAprendizaje: TipoAprendizaje[] = [];
  indice: number;

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


}
