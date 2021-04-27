import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Lugares_universidad } from 'src/app/services/lugares_universidad';

@Component({
  selector: "app-lista-sitios-destino",
  templateUrl: "./lista-sitios-destino.page.html",
  styleUrls: ["./lista-sitios-destino.page.scss"],
})
export class ListaSitiosDestinoPage implements OnInit {
  public lugares;

  origen: any;
  destino: any;

  constructor(public router: Router, private route: ActivatedRoute) {
    var lugaresUniversidad = new Lugares_universidad();
    this.lugares = new Array();
    
    this.route.queryParams.subscribe((params) => {
      if (params && params.special) {
        this.origen = JSON.parse(params.special);
        console.log(this.origen);
        var lugares = lugaresUniversidad.getLugares();
        lugares.forEach(element => {
          if (element.id != this.origen.id) {
            this.lugares.push(element)
          }
        });
      }
    });
  }

  ngOnInit() {}

  next_page(item) {
    //console.log(item);
    let navigationExtras: NavigationExtras = {
      queryParams: {
        origen: JSON.stringify(this.origen),
        destino: JSON.stringify(item),
      },
    };
    this.router.navigate(["mapa-ruta"], navigationExtras);
  }
}
