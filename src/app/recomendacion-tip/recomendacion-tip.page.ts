import { Component, OnInit } from '@angular/core';
import { TipsService } from 'src/app/Model/Tip/tips.service';
import { Tip } from '../Model/Tip/tip';
import { UsuarioGeneral } from '../Model/UsuarioGeneral/usuario-general';

@Component({
  selector: 'app-recomendacion-tip',
  templateUrl: './recomendacion-tip.page.html',
  styleUrls: ['./recomendacion-tip.page.scss'],
})
export class RecomendacionTipPage implements OnInit {
  tipRecomendado: Tip = new Tip();
  indice: number;
  user: UsuarioGeneral;

  constructor(
    private tipsService: TipsService
  ) { }

  ngOnInit() {
    this.obtenerTipRecomendado();
  }

  votar(voto: Number){
    console.log(voto)
    let a: number;
    let b: number;
    a=1
    if(voto == 1){
      this.tipsService.agregarTipGustado(a,this.tipRecomendado.id).subscribe(
        results => console.log(results),
        error => console.error(error)
      )
      this.obtenerTipRecomendado();
    }
    else{ 
      this.tipsService.agregarTipNoGustado(a,this.tipRecomendado.id).subscribe(
        results => console.log(results),
        error => console.error(error)
      )
      this.obtenerTipRecomendado();
    }
  }

  obtenerTipRecomendado(){
    this.user = JSON.parse(localStorage.getItem("Usuario"));
    this.indice = this.user.id;

    this.tipsService.obtenerRecomendacion(this.indice).subscribe(
      results => {
        this.tipRecomendado = results;
      },
      error => console.error(error)
    )

  }

}
