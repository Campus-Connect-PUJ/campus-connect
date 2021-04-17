import { Component, OnInit } from '@angular/core';
import { UsuarioGeneral } from '../Model/UsuarioGeneral/usuario-general';

@Component({
  selector: 'app-contribuciones',
  templateUrl: './contribuciones.page.html',
  styleUrls: ['./contribuciones.page.scss'],
})
export class ContribucionesPage implements OnInit {
  indice: number;
  user: UsuarioGeneral;

  constructor() { 
    this.user = JSON.parse(localStorage.getItem("Usuario"));
    this.indice = this.user.id;
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("Usuario"));
    this.indice = this.user.id;
    this.ngOnDestroy();
  }

  ngOnDestroy() {

  }

}
