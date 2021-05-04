import { Horario } from './../Model/Horario/horario';
import { UsuarioGeneral } from 'src/app/Model/UsuarioGeneral/usuario-general';
import { LoginService } from 'src/app/services/login.service';
import { UsuarioGeneralService } from './../Model/UsuarioGeneral/usuario-general.service';
import { NavController, PopoverController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { MonitorDetallesComponent } from './monitor-detalles/monitor-detalles.component';
import { MonitoriaService } from '../Model/Monitoria/monitoria.service';
import { evento } from '../calendario/evento';
import * as moment from 'moment';
import { Monitoria } from '../Model/Monitoria/monitoria';
import { Router } from '@angular/router';

export class horarioParaRecomendar{
  monitor: UsuarioGeneral;
  ocupado: Number;
  total: Number;
  constructor(){

  }
}


@Component({
  selector: 'app-monitores',
  templateUrl: './monitores.page.html',
  styleUrls: ['./monitores.page.scss'],
})
export class MonitoresPage implements OnInit {
  monitores: Array<UsuarioGeneral> = [];
  monitoresRecomendados:  Array<UsuarioGeneral> = [];
  sugerencia: Array<horarioParaRecomendar> = [];
  textoBuscar='';
  usuarioActual: UsuarioGeneral;
  eventos: evento[] = [];

  constructor(private popoverCtrl:PopoverController, 
    private monService: MonitoriaService,
    public navCtrl: NavController,
    private loginService: LoginService,
    private userService: UsuarioGeneralService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.monService.obtenerMonitores().subscribe(
      result => {
        this.monitores = result;
        //this.monitores = this.ordenarMonitores(this.obtenerPuntajes(this.monitores))
        this.obtenerPuntajes(this.monitores)
        this.sugerenciasMonitores(this.monitores)
      },
      error => console.log(error)
    )
  }


  async mostrarInfo(indice){
    const popover = await this.popoverCtrl.create({
      component: MonitorDetallesComponent,
      componentProps: {
        idUsuario: indice
      },
      cssClass: 'popover',
      translucent: true
    }); 
    await popover.present();
    const {data} = await popover.onDidDismiss();
    //this.router.navigate(['/calculadora/materias']);
    if(data.presionado > 0){
      //this.navCtrl.setDirection("/servicios-academicos")
    }
    this.monService.votarMonitor(268,5).subscribe(
      result => console.log(result),
      error => console.log(error)
    )
  }

  buscarMonitores(event){
    const texto = event.target.value;
    this.textoBuscar = texto;
  }

  sugerenciasMonitores(monitores: Array<UsuarioGeneral>){
    this.usuarioActual = this.loginService.getUser();
    //this.usuarioActual = this.logService.obtenerElemento("perso"+this.logService.getUser().email);
    for(let i=0; i<monitores.length; i++){
      for(let j=0; j< this.usuarioActual.estilosAprendizaje.length; j++){
        for(let k=0; k<this.monitores[i].estilosAprendizaje.length; k++){
            if(monitores[i].estilosAprendizaje[k].id == this.usuarioActual.estilosAprendizaje[j].id && !this.monitoresRecomendados.includes(monitores[i])  && monitores[i].id != this.usuarioActual.id){
              this.monitoresRecomendados.push(monitores[i]);
              this.mirarProblemasHorarios(monitores[i]);
            }
        }
      }
    }
    this.ordenarMejorMonitor();
  }

  mirarProblemasHorarios(monitor: UsuarioGeneral){
    const interrumpe = false;
    const monitoriasDisponibles = new Array<Monitoria>();
    const horarios = new Array<Horario>();

    this.eventos = JSON.parse(localStorage.getItem("eventos"+this.loginService.getUser().email));
    
    const eventosMonitor = monitor.monitorDe;
    let ocupadoMonitor = 0;


    for(let j=0; j<eventosMonitor.length; j++){
      for(let k=0; k<eventosMonitor[j].horarios.length; k++){
          
          const horarioInicialMonitor = moment(eventosMonitor[j].horarios[k].fechaInicio, "DD-MM-YYYY HH:mm")
          const horarioFinalMonitor = moment(eventosMonitor[j].horarios[k].fechaFin, "DD-MM-YYYY HH:mm")
          const ocupado = 0;

        try {
          for(let i=0; i<this.eventos.length && !ocupado; i++){
            if( moment(moment(this.eventos[i].startTime)).isBetween(horarioInicialMonitor, horarioFinalMonitor, undefined, '(]') || moment(moment(this.eventos[i].endTime)).isBetween(horarioInicialMonitor, horarioFinalMonitor, undefined, '[)') ){
              ocupadoMonitor++;
            }
            else if( moment(moment(horarioInicialMonitor)).isBetween(moment(this.eventos[i].startTime), moment(this.eventos[i].endTime), undefined, '(]') || moment(moment(horarioFinalMonitor)).isBetween(moment(this.eventos[i].startTime),  moment(this.eventos[i].endTime), undefined, '[)')){
              ocupadoMonitor++;
            }
          }  
        } catch (error) {
          console.log("usuario sin eventos")
        }
      }
    }

    let a = new horarioParaRecomendar();
    a.monitor = monitor;
    a.ocupado = ocupadoMonitor;

    this.sugerencia.push(a);
  }

  ordenarMejorMonitor(){
    let monitoresOrdenados = this.sugerencia;
    monitoresOrdenados.sort(function(a,b){
      if(a.monitor.puntajeTotal > b.monitor.puntajeTotal && a.ocupado < b.ocupado){
        return -2;
      }
      if(a.monitor.puntajeTotal < b.monitor.puntajeTotal && a.ocupado < b.ocupado){
        return -1;
      }
      if(a.monitor.puntajeTotal > b.monitor.puntajeTotal && a.ocupado > b.ocupado){
        return 1;
      }
      if(a.monitor.puntajeTotal < b.monitor.puntajeTotal && a.ocupado > b.ocupado){
        return 2;
      }
      
      return 0;
    });

  }

  ordenarMonitores(monitores: Array<UsuarioGeneral>){
    let monitoresOrdenados = monitores;
    monitoresOrdenados.sort(function (a, b) {
      if (a.puntajeTotal > b.puntajeTotal) {
        return -1;
      }
      if (a.puntajeTotal < b.puntajeTotal) {
        return 1;
      }
      // a must be equal to b
      return 0;
    });
    return monitoresOrdenados;
  }

  obtenerPuntajes(monitores: Array<UsuarioGeneral>){
    let sumaTotal = 0;
    let cantidadVotos = 0;
    for(let i=0; i<monitores.length; i++){
      for(let j=0; j<monitores[i].monitorDe.length; j++){
        cantidadVotos += monitores[i].monitorDe[j].cantidadVotos;
        sumaTotal += monitores[i].monitorDe[j].calificacion;
      }
      monitores[i].puntajeTotal = +(sumaTotal/cantidadVotos).toFixed(2); ;
    }
    return monitores;
  }

}
