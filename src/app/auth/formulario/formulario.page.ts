import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavigationExtras, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-formulario",
  templateUrl: "./formulario.page.html",
  styleUrls: ["./formulario.page.scss"],
})
export class FormularioPage implements OnInit {
  private url = "https://campusconnectjava.herokuapp.com/carreras";
  public carrerasJson;
  public carreras = [];
  public carreras_seleccionadas = ["Ninguna"];
  public myDate;
  public semestre = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
  public semestre_seleccionado
  authState: any = null;

  constructor(
    private http: HttpClient,
    public alertController: AlertController,
    private router: Router,
    private firebaseAuth: AngularFireAuth,
    private authSvc: AuthService
  ) {
    this.firebaseAuth.authState.subscribe((authState) => {
      this.authState = authState;
    });
  }

  async ngOnInit() {
    let result = await this.http.get(this.url).toPromise();
    this.carrerasJson = JSON.parse(JSON.stringify(result));
    let i = 0;
    this.carrerasJson.forEach((element) => {
      this.carreras.push([i, element.nombre]);
      i++;
    });
    console.log(this.carreras);
  }

  onSelectChange(selectedValue: any) {
    let selected_values = selectedValue.detail.value;
    if (selected_values.length == 0) {
      this.carreras_seleccionadas = ["Ninguna"];
    } else {
      this.carreras_seleccionadas = [];
      selected_values.forEach((element) => {
        this.carreras_seleccionadas.push(this.carreras[element][1]);
      });
    }
  }

  onSelectChangeSemestre(selectedValue: any) {
    let selected_values = selectedValue.detail.value;
    if (selected_values.length == 0) {
      this.semestre_seleccionado = null
    } else {
      this.semestre_seleccionado = selectedValue.detail.value;    
    }
  }

  async completar_registro() {
    let i = 0;
    this.carreras_seleccionadas.forEach((element) => {
      if (element != "Ninguna") {
        i++;
      }
    });
    if (typeof this.myDate == "undefined") {
      let alert = await this.alertController.create({
        cssClass: "custom-class-alert",
        header: "Error",
        subHeader: "Fecha de nacimiento seleccionada",
        message:
          "Para continuar con el registro debes seleccionar una fecha válida.",
        buttons: ["OK"],
      });
      await alert.present();
    } else{
      if (i == 0) {
        console.log(this.myDate);
        let alert = await this.alertController.create({
          cssClass: "custom-class-alert",
          header: "Error",
          subHeader: "Carrera seleccionada",
          message:
            "Para continuar con el registro debes seleccionar al menos una carrera.",
          buttons: ["OK"],
        });
        await alert.present();
      } else {
        if (this.semestre_seleccionado == null) {
          let alert = await this.alertController.create({
          cssClass: "custom-class-alert",
          header: "Error",
          subHeader: "Semestre seleccionado",
          message:
            "Para continuar con el registro debes seleccionar el semestre en el cual te encuentras.",
          buttons: ["OK"],
        });
        await alert.present();
        } else {
          let user = this.authSvc.userData();
          const userData = await this.authSvc.getUserdata(user[0].email);
          var postCarreras = []
          this.carreras_seleccionadas.forEach(element => {
            postCarreras.push(element)
          });
          let postData = {
            email: userData.email,
            name: userData.name,
            last_name: userData.last_name,
            myDate: this.myDate,
            semestre_seleccionado: this.semestre_seleccionado,
            carreras_seleccionadas: postCarreras,
          };
          const navigationExtras: NavigationExtras = {
            state: {
              postData
            },
          }; 
          this.router.navigate(["formulario_registro2"], navigationExtras);
        }
      }
    }
  }
}
