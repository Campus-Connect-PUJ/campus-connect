import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    public navCtrl: NavController,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.obtenerTiposDeAprendizaje();

    this.activatedRoute.paramMap.subscribe(paraMap => {
      const recipeId = paraMap.get('usuarioId')
      if(recipeId != null){
        console.log(recipeId)
        this.cargarTipsUsuarios(Number(recipeId));
      }
      else{
        this.cargarTips();
      }
    })
  }

  cargarTipsUsuarios(idUsuario: number){
    let tipsUsuario = new Array<Tip>();
    this.tipsService.getTips().subscribe(
      results => {
        this.tips = results;
        for(let i=0; i<this.tips.length; i++){
          console.log(".>", this.tips[i])
          if(this.tips[i].usuario.id === idUsuario){
            tipsUsuario.push(this.tips[i]);
          }
        }
        this.tips = tipsUsuario;
        console.log("Los foros", this.tips)
      },
      error => console.error(error)
    )
  }

  cargarTips(){
    this.tipsService.getTips().subscribe(
      results => {
        this.tips = results;
        this.tips = this.organizartips(this.tips);
      },
      error => console.error(error)
    )
  }

  organizartips(tips){
    let tipsOrdenados = tips;

    tipsOrdenados.sort(function (a, b) {
      if (a.puntaje > b.puntaje) {
        return -1;
      }
      if (a.puntaje < b.puntaje) {
        return 1;
      }
      // a must be equal to b
      return 0;
    });

    return tipsOrdenados;
  }


  obtenerTiposDeAprendizaje(){
    this.tipoAprendizajeService.getTiposAprendizaje().subscribe(
      results => {
        this.aprendizajesExistentes = results;
        console.log(this.aprendizajesExistentes)
      }, error =>console.error(error)
    )
  }


  buscarTips(event){
    const texto = event.target.value;
    this.textoBuscar = texto;
    this.textoBuscar2 = texto;

  }

  doRefresh(event) {
    setTimeout(() => {
      this.cargarTips()
      event.target.complete();
    }, 300);
  }


}
