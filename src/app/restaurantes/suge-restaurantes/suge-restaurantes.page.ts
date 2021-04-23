import { ɵNullViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Restaurante } from 'src/app/Model/Restaurante/restaurante';
import { RestauranteService } from 'src/app/Model/Restaurante/restaurante.service';
import { UsuarioGeneral } from 'src/app/Model/UsuarioGeneral/usuario-general';
import { LoginService } from 'src/app/services/login.service';
import {FormularioPersoRestaurantesPage} from '../formulario-perso-restaurantes/formulario-perso-restaurantes.page';

@Component({
  selector: 'app-suge-restaurantes',
  templateUrl: './suge-restaurantes.page.html',
  styleUrls: ['./suge-restaurantes.page.scss'],
})
export class SugeRestaurantesPage implements OnInit {

  usuario: UsuarioGeneral;
  restaurantes: Restaurante[]=[];
  restaurantesT: Restaurante[]=[];
  
  constructor(
    private restauranteService: RestauranteService,
    private modalControler : ModalController,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.usuario = this.loginService.getUser();
    
    if(this.usuario.comidaFav.length===0){
      this.openModal();
    }else{
      this.findRestaurantes();
    }
  }

  findRestaurantes(){
    this.restauranteService.getRestaurantes().subscribe(
      results => {
        console.log(results);
        this.restaurantesT = results;
        for(let i=0; i<this.usuario.comidaFav.length; i++){
          for (let j=0;j<this.restaurantesT.length;j++){
            if(this.restaurantesT[j].tiposComida.some(tc => tc.tipo === this.usuario.comidaFav[i].tipo)){
              this.restaurantes.push(this.restaurantesT[j]);
            }
          }
        }
      },
      error => console.error(error)
    );
  }

  infoRestaurantes(){
      
  }

  openModal(){
    this.modalControler.create({component : FormularioPersoRestaurantesPage}).then((modalElement)=>{
      modalElement.present();
    });
  }
}
