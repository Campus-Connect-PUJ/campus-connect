import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Restaurante } from '../../../Model/Restaurante/restaurante';
import { RestauranteService } from '../../../Model/Restaurante/restaurante.service';


@Component({
  selector: 'app-datos-restaurante',
  templateUrl: './datos-restaurante.page.html',
  styleUrls: ['./datos-restaurante.page.scss'],
})
export class DatosRestaurantePage implements OnInit {

  restauranteSelect: Restaurante =new Restaurante ("","",0,0);

  constructor( private activatedRoute :ActivatedRoute, private restauranteService : RestauranteService ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap =>{
      const restauranteID = paramMap.get('restauranteID')
      this.findGrupo(+restauranteID);
    }) 
  }

  findGrupo(restauranteID: number) {
    this.restauranteService.getRestauranteById(restauranteID).subscribe(
      results => {
        console.log(results);
        this.restauranteSelect = results;
      },
      error => console.error(error)
    )
  }


}
