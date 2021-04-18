import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioGeneral } from 'src/app/Model/UsuarioGeneral/usuario-general';
import { UsuarioGeneralService } from 'src/app/Model/UsuarioGeneral/usuario-general.service';
import { LoginService } from 'src/app/services/login.service';
import { Restaurante } from '../../../Model/Restaurante/restaurante';
import { RestauranteService } from '../../../Model/Restaurante/restaurante.service';


@Component({
  selector: 'app-datos-restaurante',
  templateUrl: './datos-restaurante.page.html',
  styleUrls: ['./datos-restaurante.page.scss'],
})
export class DatosRestaurantePage implements OnInit {

  puntajeAsig: number;

  restauranteSelect: Restaurante =new Restaurante ("","",0,0);
  usuario: UsuarioGeneral;

  constructor( private activatedRoute :ActivatedRoute, private restauranteService : RestauranteService, private usuarioSer: UsuarioGeneralService, private loginService: LoginService ) { }

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

  guardarPuntajeRestaurnate(event){
    const puntaje = event.target.value;
    this.puntajeAsig = puntaje;
    this.usuario = this.loginService.getUser(); 

    this.usuarioSer.createReseniaRestaurante(this.puntajeAsig,this.usuario.id,this.restauranteSelect.id).subscribe(
      results => console.log(results),
      error => console.error(error)
    );
  }

}
