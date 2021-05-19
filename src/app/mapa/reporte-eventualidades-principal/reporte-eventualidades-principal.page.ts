import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Eventualidad } from 'src/app/Model/Eventualidad/eventualidad';
import { EventualidadService } from 'src/app/Model/Eventualidad/eventualidad.service';
import { tipos_eventualidades } from 'src/app/services/tipos_eventualidades';

@Component({
  selector: "app-reporte-eventualidades-principal",
  templateUrl: "./reporte-eventualidades-principal.page.html",
  styleUrls: ["./reporte-eventualidades-principal.page.scss"],
})
export class ReporteEventualidadesPrincipalPage implements OnInit {
  tipos: any;

  actual: any;

  selected_tipo_eventualidad: any;
  descripcion: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public alertController: AlertController,
    private evService: EventualidadService
  ) {
    this.route.queryParams.subscribe((params) => {
      if (params && params.actual) {
        this.actual = JSON.parse(params.actual);
      }
    });
    var tiposEventualidades = new tipos_eventualidades();
    this.tipos = tiposEventualidades.getTipos();
  }

  ngOnInit() {}

  onBackAction($event) {
    this.router.navigate(["mapa-principal"]);
  }

  radioGroupChange(event) {
    this.selected_tipo_eventualidad = event.detail.value;
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
    } else {
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
        var evEnviar = new Eventualidad();
        evEnviar.descripcion = this.descripcion;
        evEnviar.latitud = this.actual.lat;
        evEnviar.longitud = this.actual.lng;
        evEnviar.tipo = this.selected_tipo_eventualidad;
        this.evService.createEventualidad(evEnviar).subscribe(
          (results) => {
            console.log(results);
          },
          (error) => {
            console.error(error);
          }
        );
        this.router.navigate(["mapa-principal"]);
      }
    }
  }
}
