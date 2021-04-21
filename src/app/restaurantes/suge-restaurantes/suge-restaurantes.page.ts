import { Component, OnInit } from '@angular/core';
import { Restaurante } from 'src/app/Model/Restaurante/restaurante';
import { UsuarioGeneral } from 'src/app/Model/UsuarioGeneral/usuario-general';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-suge-restaurantes',
  templateUrl: './suge-restaurantes.page.html',
  styleUrls: ['./suge-restaurantes.page.scss'],
})
export class SugeRestaurantesPage implements OnInit {

  usuario: UsuarioGeneral;
  restaurantes: Restaurante[]=[]
  
  constructor(
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.usuario = this.loginService.getUser();
    this.findRestaurantes();
  }

  findRestaurantes(){
    this.restaurantes=this.usuario.restaurantesSugeridos;
  }

  infoRestaurantes(){
      
  }

}
