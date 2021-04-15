import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UsuarioGeneral } from 'src/app/Model/UsuarioGeneral/usuario-general';
import { UsuarioGeneralService } from 'src/app/Model/UsuarioGeneral/usuario-general.service';

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
  public generos = ["Hombre", "Mujer", "LGTBI", "Prefiero no decirlo"];

  public sexos = ["Masculino", "Femenino", "Prefiero no decirlo"];

  public user_data: UsuarioGeneral;
  private religion: any = null;
  private ethnicity: any = null;
  private birth: any = null;
  private gender: any = null;
  private sex: any = null;

  constructor(
    private router: Router,
    public alertController: AlertController,
    private ugService: UsuarioGeneralService
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

  async alertaElementoNoSeleccionado(elemento, mensaje) {
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
    if (this.religion == null) {
      await this.alertaElementoNoSeleccionado(
        "Creencia no seleccionada",
        "Para continuar con el registro debes seleccionar una creencia válida."
      );
    } else if (this.ethnicity == null) {
      await this.alertaElementoNoSeleccionado(
        "Etnia no seleccionada",
        "Para continuar con el registro debes seleccionar una étnia válida."
      );
    } else if (this.birth == null) {
      await this.alertaElementoNoSeleccionado(
        "Lugar de nacimiento no seleccionado",
        "Para continuar con el registro debes responder la pregunta de tu lugar de nacimiento."
      );
    } else if (this.gender == null) {
      await this.alertaElementoNoSeleccionado(
        "Género no seleccionado",
        "Para continuar con el registro responder la pregunta de orientación de género."
      );
    } else if (this.sex == null) {
      await this.alertaElementoNoSeleccionado(
        "Sexo no seleccionado",
        "Para continuar con el registro responder la pregunta del sexo."
      );
    } else {  //Datos completos
      this.ugService.createUsuarioGeneral(this.user_data);
      this.router.navigate(["auth-home"]);
    }
  }
}
