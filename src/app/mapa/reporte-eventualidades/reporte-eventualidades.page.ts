import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: "app-reporte-eventualidades",
  templateUrl: "./reporte-eventualidades.page.html",
  styleUrls: ["./reporte-eventualidades.page.scss"],
})
export class ReporteEventualidadesPage implements OnInit {
  origen: any;
  destino: any;
  actual: any;

  constructor(
    private route: ActivatedRoute, 
    private router: Router
  ) {
    this.route.queryParams.subscribe((params) => {
      if (params && params.destino && params.origen) {
        this.origen = JSON.parse(params.origen);
        this.destino = JSON.parse(params.destino);
        this.actual = JSON.parse(params.actual)
        //console.log(this.data);
      }
    });
  }

  ngOnInit() {}

  onBackAction($event) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        destino: JSON.stringify(this.destino),
        origen: JSON.stringify(this.origen),
        actual: JSON.stringify(this.actual),
      },
    };
    this.router.navigate(["mapa-ruta"], navigationExtras);
  }
}
