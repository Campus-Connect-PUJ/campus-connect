import { Lugares_universidad } from './../../services/lugares_universidad';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: "app-lista-sitios",
  templateUrl: "./lista-sitios.page.html",
  styleUrls: ["./lista-sitios.page.scss"],
})
export class ListaSitiosPage implements OnInit {
  public lugares;

  constructor(public router: Router) {
    var lugaresUniversidad = new Lugares_universidad();
    this.lugares = lugaresUniversidad.getLugares();
  }

  ngOnInit() {}

  next_page(item) {
    //console.log(item);
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(item),
      },
    };
    this.router.navigate(["lista-sitios-destino"], navigationExtras);
  }
}
