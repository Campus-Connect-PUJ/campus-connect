import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import * as moment from 'moment';
import { Monitoria } from 'src/app/Model/Monitoria/monitoria';
import { MonitoriaService } from 'src/app/Model/Monitoria/monitoria.service';
import { UsuarioGeneral } from 'src/app/Model/UsuarioGeneral/usuario-general';
import { LoginService } from 'src/app/services/login.service';
import { Horario } from "../../Model/Horario/horario";

@Component({
  selector: 'app-monitor-asignatura',
  templateUrl: './monitor-asignatura.page.html',
  styleUrls: ['./monitor-asignatura.page.scss'],
})
export class MonitorAsignaturaPage implements OnInit {

  idMonitor = 0;
  monitores: Array<UsuarioGeneral> = [];
  monitor: UsuarioGeneral = new UsuarioGeneral(" ", " ", " ");
  usuarioActual: UsuarioGeneral;
  voto = 0;
  errorSi = false;
  idMonitoria = 0;
  monitoria: Monitoria;
  puntajeAsignatura = 0;

  horariosSugeridos: Horario[] = [];
  horarios: Horario[] = [];


  indiceAsignatura: number;
  constructor(
    private activatedRoute: ActivatedRoute, 
    private monService: MonitoriaService,
    private loginService: LoginService,
    public alertController: AlertController,
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paraMap => {
      const recipeId = paraMap.get('monitorID')
      const recipeId2 = paraMap.get('asignaturaID')
      if(recipeId != null){
        this.idMonitor = +recipeId;
        this.monService.obtenerMonitores().subscribe(
          (result: UsuarioGeneral[]) => {
            this.monitores = result;
            for(let i=0; i<this.monitores.length; i++){
              if(this.monitores[i].id == this.idMonitor){
                this.monitor = this.monitores[i];
              }
            }
            this.idMonitoria = +recipeId2;
            this.arreglarFechas(this.monitor)
            this.obtenerHorarios(this.monitor);
            this.usuarioActual = this.loginService.getUser();
            console.log(this.usuarioActual);
            console.log(this.usuarioActual.tipsGustados)
            console.log(this.usuarioActual.monitoresVotaron)
            //this.sugerenciasHorariosMonitorias(this.monitor)
          },
          error => console.log(error)
        )
      }
      else{
        console.log("Lo otro")
      }
    })
  }

  async enviarVoto(){
    
    console.log(this.usuarioActual)
    if(!this.yaCalificoMonitoria(this.usuarioActual, this.monitor.monitorDe[this.indiceAsignatura])){
      if(this.voto > 5 || this.voto <= 0){
        this.errorSi = true;
        return
      }
      else{
        this.errorSi = false;
        console.log("A la monitoria ", this.idMonitoria, " el voto ", this.voto)
        this.monService.votarMonitor(this.idMonitoria, this.voto).subscribe(
          result => {
            console.log(result)
          },
          error => console.log(error)
        )
  
      }
      console.log("voto ", this.voto)
      this.calcularNuevoPuntaje();
      this.usuarioActual.monitoresVotaron.push(this.monitor.monitorDe[this.indiceAsignatura]);
      console.log(this.usuarioActual)
      this.loginService.storeUser(this.usuarioActual, this.loginService.getToken())
    }
    else{
      await this.alertaElementoNoSeleccionado(
        "Voto ya realizado",
        "Ya habia votado por este usuario"
      );
    }
  }

  yaCalificoMonitoria(usuario: UsuarioGeneral, monitor: Monitoria){
    try {
      for(let i=0; i<usuario.monitoresVotaron.length; i++){
        if(usuario.monitoresVotaron[i].id == monitor.id){
          return true;
        }
      }
    } catch (error) {
      return false;
    }
    return false;

  }

  async alertaElementoNoSeleccionado(elemento: string, mensaje: string) {
    const alert = await this.alertController.create({
      cssClass: "custom-class-alert",
      header: "Error",
      subHeader: elemento,
      message: mensaje,
      buttons: ["OK"],
    });
    await alert.present();
  }
  

  calcularNuevoPuntaje(){    
    let sumaTotal = 0;
    let cantidadVotos = 0;
    cantidadVotos += this.monitor.monitorDe[this.indiceAsignatura].cantidadVotos;
    sumaTotal += this.monitor.monitorDe[this.indiceAsignatura].calificacion;

    console.log("cantidad votos1 ", cantidadVotos, " ", sumaTotal)
    cantidadVotos = cantidadVotos + 1;
    sumaTotal = sumaTotal + +this.voto;

    console.log("cantidad votos2 ", cantidadVotos, " ", sumaTotal)
    this.puntajeAsignatura = +(sumaTotal / cantidadVotos).toFixed(2);
    console.log("el puntaje ", this.puntajeAsignatura)
  }

  obtenerHorarios(monitor: UsuarioGeneral){
    this.indiceAsignatura = 0;
    console.log(this.idMonitoria)
    this.horarios = Array<Horario>();
    for(let i=0; i<monitor.monitorDe.length; i++){
      if(monitor.monitorDe[i].asignatura.id == +this.idMonitoria){
        this.indiceAsignatura = i;
      }
    }
    this.idMonitoria = monitor.monitorDe[this.indiceAsignatura].id;
    this.monitoria = monitor.monitorDe[this.indiceAsignatura];
    this.obtenerPuntajes(monitor, this.indiceAsignatura);
    for(let i=0; i<monitor.monitorDe[this.indiceAsignatura].horarios.length; i++){
      let data: Horario = new Horario();
      data.id = monitor.monitorDe[this.indiceAsignatura].horarios[i].id;
      data.fechaInicial = monitor.monitorDe[this.indiceAsignatura].horarios[i].fechaInicial;
      data.fechaFinal = monitor.monitorDe[this.indiceAsignatura].horarios[i].fechaFinal;
      data.lugar = monitor.monitorDe[this.indiceAsignatura].horarios[i].lugar;
      this.horarios.push(data);
    }
    
    this.ordenarHorarios();
  }

  ordenarHorarios(){
    const horariosOrdenados = this.horarios;

    horariosOrdenados.sort(function (a, b) {
      if( moment(a.fechaInicial).isBefore(b.fechaInicial) ){
        return -1;
      }
      if( !moment(a.fechaInicial).isBefore(b.fechaInicial)){
        return 1;
      }
      // a must be equal to b
      return 0;
    });
    this.horarios = horariosOrdenados;
    console.log(this.horarios)
  }

  convertir(fecha: Date): string{
    const resultado: string = moment(fecha).format("DD-MMM-YYYY HH:mm");
    return resultado;
  }

  
  arreglarFechas(monitor: UsuarioGeneral){
    console.log("entra");

      for(let j=0; j<monitor.monitorDe.length; j++){
        for(let k=0; k<monitor.monitorDe[j].horarios.length; k++){
          monitor.monitorDe[j].horarios[k].fechaInicial = moment(monitor.monitorDe[j].horarios[k].fechaInicial).subtract(Number(5),'hours').toDate();
          monitor.monitorDe[j].horarios[k].fechaFinal = moment(monitor.monitorDe[j].horarios[k].fechaFinal).subtract(Number(5),'hours').toDate();
        }
      }
    
  }

  obtenerPuntajes(monitor: UsuarioGeneral, id: number){
    let sumaTotal = 0;
    let cantidadVotos = 0;

    console.log(monitor)
    cantidadVotos += monitor.monitorDe[id].cantidadVotos;
    sumaTotal += monitor.monitorDe[id].calificacion;
    console.log("cantidad votos ", cantidadVotos, " ", sumaTotal)
    this.puntajeAsignatura = +(sumaTotal / cantidadVotos).toFixed(2);
    console.log("el puntaje ", this.puntajeAsignatura)
    return monitor;
  }

}
