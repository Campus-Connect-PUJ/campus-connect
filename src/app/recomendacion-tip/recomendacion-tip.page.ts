import { Component, OnInit } from '@angular/core';
import { TipsService } from 'src/app/Model/Tip/tips.service';
import { Tip } from '../Model/Tip/tip';
import { UsuarioGeneral } from '../Model/UsuarioGeneral/usuario-general';
import { LoginService } from '../services/login.service';

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
    private tipsService: TipsService,
    private loginService: LoginService,
  ) { }

  ngOnInit() {
    this.obtenerTipRecomendado();
  }

  votar(voto: number){
    console.log(voto);

    this.user = this.loginService.getUser();
    this.indice = this.user.id;
    if(voto == 1){
      this.tipsService.agregarTipGustado(this.indice, this.tipRecomendado.id).subscribe(
        results => {this.obtenerTipRecomendado()},
        error => console.error(error)
      )
      
    }
    else{ 
      this.tipsService.agregarTipNoGustado(this.indice, this.tipRecomendado.id).subscribe(
        results => {this.obtenerTipRecomendado()},
        error => console.error(error)
      )
    }
  }

  obtenerTipRecomendado(){
    this.user = this.loginService.getUser();
    this.indice = this.user.id;
    console.log(this.indice)
    this.tipsService.obtenerRecomendacion().subscribe(
      results => {
        this.tipRecomendado = results;
      },
      error => console.error(error)
    )

  }

}
