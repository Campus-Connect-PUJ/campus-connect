import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Restaurante } from '../clase/restaurante';
import { RestauranteService } from '../clase/restaurante.service';

@Component({
  selector: 'app-recomendar-restaurantes',
  templateUrl: './recomendar-restaurantes.page.html',
  styleUrls: ['./recomendar-restaurantes.page.scss'],
})
export class RecomendarRestaurantesPage implements OnInit {

  restaurantes: Restaurante[] = [];
  textoBuscar='';

  constructor(
    private restauranteService: RestauranteService,
    public router: Router,
    public navCtrl : NavController
  ) { }

  ngOnInit() {
    this.findRestaurantes();
  }

  findRestaurantes() {
    this.restauranteService.getRestaurantes().subscribe(
      results => {
        console.log(results);
        this.restaurantes = results;
      },
      error => console.error(error)
    )
  }

  buscarRestaurante(event){
    const texto = event.target.value;
    this.textoBuscar = texto;
    
  }

  infoRestaurante(){
    
  }


}
