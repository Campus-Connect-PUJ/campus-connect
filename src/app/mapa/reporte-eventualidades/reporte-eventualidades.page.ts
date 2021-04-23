import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { tipos_eventualidades } from 'src/app/services/tipos_eventualidades';

@Component({
  selector: "app-reporte-eventualidades",
  templateUrl: "./reporte-eventualidades.page.html",
  styleUrls: ["./reporte-eventualidades.page.scss"],
})
export class ReporteEventualidadesPage implements OnInit {
  origen: any;
  destino: any;
  actual: any;

  tipos: any;

  selected_tipo_eventualidad: any = null;
  descripcion: any = null;

  url = "localhost"

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public alertController: AlertController
  ) {
    this.route.queryParams.subscribe((params) => {
      if (params && params.destino && params.origen) {
        this.origen = JSON.parse(params.origen);
        this.destino = JSON.parse(params.destino);
        this.actual = JSON.parse(params.actual);
        //console.log(this.data);
      }
    });
    var tiposEventualidades = new tipos_eventualidades();
    this.tipos = tiposEventualidades.getTipos();
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

  radioGroupChange(event) {
    console.log("radioGroupChange", event.detail);
    this.selected_tipo_eventualidad = event.detail;
  }

  async sendInfo(event) {
    if (this.selected_tipo_eventualidad == null) {
      let alert = await this.alertController.create({
        cssClass: "custom-class-alert",
        header: "Error",
        subHeader: "Tipo de eventualidad no seleccionada",
        message: "Favor seleccionar un tipo de eventualidad.",
        buttons: ["OK"],
      });
      await alert.present();
    }else{
      if (this.descripcion == null || this.descripcion == "") {
        let alert = await this.alertController.create({
          cssClass: "custom-class-alert",
          header: "Error",
          subHeader: "Descripción no escrita",
          message:
            "Favor escribir una descripción del inconveniente que estas enviando.",
          buttons: ["OK"],
        });
        await alert.present();
      } else {
        //TODO enviar datos al back
      }
    }
  }
}
