import { NavigationExtras, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AlertController } from "@ionic/angular";
import { Carrera } from 'src/app/Model/Carrera/carrera';
import { CarrerasService } from 'src/app/Model/Carrera/carreras.service';

@Component({
  selector: "app-formulario",
  templateUrl: "./formulario.page.html",
  styleUrls: ["./formulario.page.scss"],
})
export class FormularioPage implements OnInit {
  public carreras: Carrera[] = [];
  public carreras_seleccionadas: Carrera[] = [];
  public fechaNacimiento: Date;

  constructor(
    public alertController: AlertController,
    private router: Router,
    private carrerasService: CarrerasService
  ) {
  }

  async ngOnInit() {
    this.carrerasService.getCarreras().subscribe(
      results => {
        console.log(results);
        this.carreras = results;
        // results.forEach((element: Carrera) => {
        //   this.carreras.push(element);
        // });
      },
      error => console.error(error)
    );
  }

  async alertaElementoNoSeleccionado(elemento: string, mensaje: string) {
    let alert = await this.alertController.create({
      cssClass: "custom-class-alert",
      header: "Error",
      subHeader: elemento,
      message: mensaje,
      buttons: ["OK"],
    });
    await alert.present();
  }

  async completar_registro() {
    if (typeof this.fechaNacimiento == "undefined") {
      await this.alertaElementoNoSeleccionado(
        "Fecha de nacimiento seleccionada",
        "Para continuar con el registro debes seleccionar una fecha válida."
      );
    } else if (this.carreras_seleccionadas.length == 0) {

      await this.alertaElementoNoSeleccionado(
        "Carrera seleccionada",
        "Para continuar con el registro debes seleccionar al menos una carrera."
      );
    // } else if (this.semestre_seleccionado == null) {
    //   await this.alertaElementoNoSeleccionado(
    //     "Semestre seleccionado",
    //     "Para continuar con el registro debes seleccionar el semestre en el cual te encuentras."
    //   );
    } else {

      this.carreras_seleccionadas.forEach((a)=> console.log(">>>>" + a.id));
      let postData = {
        fechaNacimiento: this.fechaNacimiento,
        carreras: this.carreras_seleccionadas,
      };

      console.log(JSON.stringify(postData));
      const navigationExtras: NavigationExtras = {
        state: {
          postData
        },
      };
      this.router.navigate(["formulario_registro2"], navigationExtras);
    }
  }
}
