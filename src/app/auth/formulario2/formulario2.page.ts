import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { user_data } from './../../model/shared/user_data';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: "app-formulario2",
  templateUrl: "./formulario2.page.html",
  styleUrls: ["./formulario2.page.scss"],
})
export class Formulario2Page implements OnInit {
  public religiones = [
    ["BUDI", "Budismo"],
    ["CATO", "Catolicismo"],
    ["CRIS", "Otras Denominaciones Cristianas"],
    ["HIND", "Hinduismo"],
    ["ISLA", "Islamismo"],
    ["JUD", "Judaísmo"],
    ["N/A", "Ninguna"],
    ["OTRA", "Otra"],
  ];
  public grupo_etnicos = [
    ["AFROCOL", "Afrocolombiano"],
    ["GITANO", "Gitano"],
    ["INDÍGENA", "Indígena"],
    ["NINGUNO", "Ninguno"],
    ["OTRO", "Otro"],
    ["RAIZAL", "Raizal"],
  ];
  public generos = ["Hombre", "Mujer", "De otro modo", "Prefiero no decirlo"];

  public sexos = ["Masculino", "Femenino", "Prefiero no decirlo"];

  public user_data: user_data;
  private religion: any = null;
  private ethnicity: any = null;
  private birth: any = null;
  private gender: any = null;
  private sex: any = null;

  constructor(
    private router: Router,
    public alertController: AlertController,
    private http: HttpClient
  ) {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    const postData = navigation.extras.state;
    this.user_data = postData.postData;
    console.log(this.user_data);
  }

  onReligionChange(selectedValue: any) {
    let selected_values = selectedValue.detail.value;
    this.religion = selected_values;
  }

  onEtnicityChange(selectedValue: any) {
    let selected_values = selectedValue.detail.value;
    this.ethnicity = selected_values;
  }

  onBirthChange(selectedValue: any) {
    let selected_values = selectedValue.detail.value;
    this.birth = selected_values;
  }

  onGenderChange(selectedValue: any) {
    let selected_values = selectedValue.detail.value;
    this.gender = selected_values;
  }

  onSexChange(selectedValue: any) {
    let selected_values = selectedValue.detail.value;
    this.sex = selected_values;
  }

  async completar_registro() {
    if (this.religion == null) {
      let alert = await this.alertController.create({
        cssClass: "custom-class-alert",
        header: "Error",
        subHeader: "Creencia no seleccionada",
        message:
          "Para continuar con el registro debes seleccionar una creencia válida.",
        buttons: ["OK"],
      });
      await alert.present();
    } else {
      if (this.ethnicity == null) {
        let alert = await this.alertController.create({
          cssClass: "custom-class-alert",
          header: "Error",
          subHeader: "Etnia no seleccionada",
          message:
            "Para continuar con el registro debes seleccionar una étnia válida.",
          buttons: ["OK"],
        });
        await alert.present();
      } else {
        if (this.birth == null) {
          let alert = await this.alertController.create({
            cssClass: "custom-class-alert",
            header: "Error",
            subHeader: "Lugar de nacimiento no seleccionado",
            message:
              "Para continuar con el registro debes responder la pregunta de tu lugar de nacimiento.",
            buttons: ["OK"],
          });
          await alert.present();
        } else {
          if (this.gender == null) {
            let alert = await this.alertController.create({
              cssClass: "custom-class-alert",
              header: "Error",
              subHeader: "Género no seleccionado",
              message:
                "Para continuar con el registro responder la pregunta de orientación de género.",
              buttons: ["OK"],
            });
            await alert.present();
          } else {
            if (this.sex == null) {
              let alert = await this.alertController.create({
                cssClass: "custom-class-alert",
                header: "Error",
                subHeader: "Sexo no seleccionado",
                message:
                  "Para continuar con el registro responder la pregunta del sexo.",
                buttons: ["OK"],
              });
              await alert.present();
            } else {
              //Datos ingresados completos
              let obj = [];
              let i = 0;
              this.user_data.carreras_seleccionadas.forEach(
                (item) => obj.push(item)
              );
              let postData = {
                email: this.user_data.email,
                name: this.user_data.name,
                last_name: this.user_data.last_name,
                myDate: this.user_data.myDate,
                semestre_seleccionado: this.user_data.semestre_seleccionado,
                carreras_seleccionadas: obj,
                religion: this.religion,
                etnico: this.ethnicity,
                nacimiento: this.birth,
                genero: this.gender,
                sexo: this.sex
              };
              console.log(this.birth);
              const options = {
                headers: {
                  "Content-Type": "application/json",
                },
              };

              const url = "http://localhost:8080/createusuario/";
              console.log("postData: ");
              console.log(postData);
              console.log(this.http.post(url, postData, options).toPromise());
              this.router.navigate(["auth-home"]);
            }
          }
        }
      }
    }
  }
}
