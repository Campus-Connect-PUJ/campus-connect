import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Restaurante } from '../../Model/Restaurante/restaurante';
import { RestauranteService } from '../../Model/Restaurante/restaurante.service';
import {ModalController} from '@ionic/angular';
import {FormularioPersoRestaurantesPage} from '../formulario-perso-restaurantes/formulario-perso-restaurantes.page';
import { TipoComidaService } from 'src/app/Model/TipoComida/tipo-comida.service';
import { TipoComida } from 'src/app/Model/TipoComida/tipo-comida';


@Component({
  selector: 'app-recomendar-restaurantes',
  templateUrl: './recomendar-restaurantes.page.html',
  styleUrls: ['./recomendar-restaurantes.page.scss'],
})
export class RecomendarRestaurantesPage implements OnInit {

  restaurantes: Restaurante[] = [];
  comidas: TipoComida[] = [];
  textoBuscar='';
  comidaBuscar='';
  tiempoBuscar=0;
  precioBuscar=0;

  collapseCard = true;

  itemSelected: TipoComida;

  constructor(
    private restauranteService: RestauranteService,
    public router: Router,
    public navCtrl : NavController,
    private modalControler : ModalController,
    private tcService : TipoComidaService
  ) { }

  ngOnInit() {
    this.findRestaurantes();
    this.findComida();
  }

  findRestaurantes() {
    this.restauranteService.getRestaurantes().subscribe(
      results => {
        console.log(results);
        this.restaurantes = results;
      },
      error => console.error(error)
    );
  }

  buscarRestaurante(event){
    const texto = event.target.value;
    this.textoBuscar = texto;
    
  }

  findComida() {
    this.tcService.getTipoComida().subscribe(
      results => {
        console.log(results);
        this.comidas = results;
      },
      error => console.error(error)
    );
  }

  buscarRestauranteComida(event){
    const comida = event.target.value;
    this.comidaBuscar = comida;
    
  }

  buscarRestauranteTiempo(event){
    const tiempo = event.target.value;
    this.tiempoBuscar = tiempo;
    console.log(this.tiempoBuscar);
  }

  buscarRestaurantePrecio(event){
    const precio = event.target.value;
    this.precioBuscar = precio;
  }

  openModal(){
    this.modalControler.create({component : FormularioPersoRestaurantesPage}).then((modalElement)=>{
      modalElement.present();
    });
  }

  doRefresh(event) {
    setTimeout(() => {
      this.reload()
      event.target.complete();
    }, 300);
  }

  reload() {
    this.findRestaurantes();
  }

}
