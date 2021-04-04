import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Tip } from '../Model/Tip/tip';
import { TipsService } from '../Model/Tip/tips.service';
import { TipoAprendizaje } from '../Model/TipoAprendizaje/tipo-aprendizaje';
import { TipoAprendizajeService } from 'src/app/Model/TipoAprendizaje/tipo-aprendizaje.service';

@Component({
  selector: 'app-tips',
  templateUrl: './tips.page.html',
  styleUrls: ['./tips.page.scss'],
})
export class TipsPage implements OnInit {

  tips: Tip[] = [];
  tiposDeAprendizaje: TipoAprendizaje[][] = [];
  aprendizajesExistentes: Array<TipoAprendizaje> = [];
  tiposDeAprendizajeSeleccionados = []
  textoBuscar='';
  textoBuscar2='';
  tipos: string[] = [];

  constructor(
    private tipsService: TipsService,
    private tipoAprendizajeService: TipoAprendizajeService,
    public router: Router,
    public navCtrl: NavController
  ) { }

  ngOnInit() {
    this.findTips();
    this.obtenerTiposDeAprendizaje();
  }

  obtenerTiposDeAprendizaje(){
    this.tipoAprendizajeService.getTiposAprendizaje().subscribe(
      results => {
        this.aprendizajesExistentes = results;
        console.log(this.aprendizajesExistentes)
      }, error =>console.error(error)
    )
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
    this.textoBuscar2 = texto;

  }

  doRefresh(event) {
    setTimeout(() => {
      this.findTips()
      event.target.complete();
    }, 300);
  }


}
