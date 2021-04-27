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

  constructor(
    private restauranteService: RestauranteService,
    private modalControler : ModalController,
    private loginService: LoginService
  ) {
    this.usuario = this.loginService.getUser();
  }

  ngOnInit() {
    this.algo();
  }

  algo() {
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
        const restaurantesT = results;
        for(let i=0; i<this.usuario.comidaFav.length; i++){
          for (let j=0;j<restaurantesT.length;j++){
            if(restaurantesT[j].tiposComida.some(tc => tc.tipo === this.usuario.comidaFav[i].tipo)){
              if(!this.restaurantes.includes(restaurantesT[j])){
                this.restaurantes.push(restaurantesT[j]);
              }
            }
          }
        }
      },
      error => console.error(error)
    );
  }

  infoRestaurantes(){
      
  }

  async openModal(){
    const modal = await this.modalControler.create(
      {component : FormularioPersoRestaurantesPage}
    );
    modal.onDidDismiss().then( () => {
      this.usuario = this.loginService.getUser();
      this.algo();
    });
    await modal.present();

  }
}
