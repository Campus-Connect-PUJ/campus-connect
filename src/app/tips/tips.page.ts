import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Tip } from './shared/tips';
import { TipsService } from './shared/tips.service';

@Component({
  selector: 'app-tips',
  templateUrl: './tips.page.html',
  styleUrls: ['./tips.page.scss'],
})
export class TipsPage implements OnInit {

  tips: Tip[] = [];
  textoBuscar='';

  constructor(
    private tipsService: TipsService,
    public router: Router,
    public navCtrl: NavController
  ) { }

  ngOnInit() {
    this.findTips();
  }

  findTips(){
    this.tipsService.getTips().subscribe(
      results => {
        this.tips = results;
      },
      error => console.error(error)
    )
  }

  buscarTips(event){
    const texto = event.target.value;
    this.textoBuscar = texto;
  }

}
