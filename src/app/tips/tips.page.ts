import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Tip, TipoAprendizaje } from './shared/tips';
import { TipsService } from './shared/tips.service';

@Component({
  selector: 'app-tips',
  templateUrl: './tips.page.html',
  styleUrls: ['./tips.page.scss'],
})
export class TipsPage implements OnInit {

  tips: Tip[] = [];
  tiposDeAprendizaje: TipoAprendizaje[][] = [];
  textoBuscar='';
  tipos: string[] = [];

  constructor(
    private tipsService: TipsService,
    public router: Router,
    public navCtrl: NavController
  ) { }

  ngOnInit() {
    this.findTips();
    console.log(this.tips)
    console.log(this.tiposDeAprendizaje.length)
  }

  findTips(){
    this.tipsService.getTips().subscribe(
      results => {
        this.tips = results;
        /*
        results.forEach(element => {

          this.tiposDeAprendizaje[element.id]=element.tipoAprendizaje;
         });
         */
      },
      error => console.error(error)
    )
  }

  buscarTips(event){
    const texto = event.target.value;
    this.textoBuscar = texto;

  }

}
