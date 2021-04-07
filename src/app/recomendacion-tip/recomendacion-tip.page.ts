import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recomendacion-tip',
  templateUrl: './recomendacion-tip.page.html',
  styleUrls: ['./recomendacion-tip.page.scss'],
})
export class RecomendacionTipPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  votar(voto: Number){
    console.log(voto)
  }

}
