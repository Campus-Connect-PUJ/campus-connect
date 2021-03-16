import { Component, OnInit } from '@angular/core';
import { Tip } from '../shared/tips';
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

  tip: Tip;
  indice: number;

  constructor(
    private tipsService: TipsService,
    private activatedRoute: ActivatedRoute,
    public navCtrl: NavController
  ) { }

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(paraMap => {
      const recipeId = paraMap.get('tipId')
      this.indice = Number(recipeId);
    })

    this.findTip(this.indice+1);
  }

  findTip(tipID: number){
    this.tipsService.getTipById(tipID).subscribe(
      results => {
        console.log(results);
        this.tip = results;

      },
      error => console.error(error)
    )

  }


}
