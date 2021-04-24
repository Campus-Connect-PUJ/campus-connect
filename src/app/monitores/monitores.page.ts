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

@Component({
  selector: 'app-monitores',
  templateUrl: './monitores.page.html',
  styleUrls: ['./monitores.page.scss'],
})
export class MonitoresPage implements OnInit {
  monitores: Array<UsuarioGeneral> = [];
  monitoresRecomendados:  Array<UsuarioGeneral> = [];
  usuarioActual: UsuarioGeneral;

  public eventos: evento[] = [];

  constructor(private popoverCtrl:PopoverController, 
    private monService: MonitoriaService,
    public navCtrl: NavController,
    private logService: LoginService,
    private userService: UsuarioGeneralService
  ) { }

  ngOnInit() {
    this.monService.obtenerMonitores().subscribe(
      result => {
        this.monitores = result;
        console.log("Monitores ",this.monitores)
        this.monitores = this.ordenarMonitores(this.obtenerPuntajes(this.monitores))
        this.sugerenciasMonitores(this.monitores)
      },
      error => console.log(error)
    )

  }


  async mostrarInfo(indice){
    console.log("Indie", indice)
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
    console.log(data);
    if(data.presionado > 0){
      //this.navCtrl.setDirection("/servicios-academicos")
    }

    this.monService.votarMonitor(268,5).subscribe(
      result => console.log(result),
      error => console.log(error)
    )
  }

  sugerenciasMonitores(monitores: Array<UsuarioGeneral>){
    this.usuarioActual = this.logService.obtenerElemento("perso"+this.logService.getUser().email);

    for(let i=0; i<monitores.length; i++){
      for(let j=0; j< this.usuarioActual.estilosAprendizaje.length; j++){
        for(let k=0; k<this.monitores[i].estilosAprendizaje.length; k++){
            //console.log(this.monitores[i].estilosAprendizaje, " ", this.usuarioActual.estilosAprendizaje)
            if(monitores[i].estilosAprendizaje[k].id == this.usuarioActual.estilosAprendizaje[j].id && !this.monitoresRecomendados.includes(monitores[i])){
              this.mirarProblemasHorarios(monitores[i])
              this.monitoresRecomendados.push(monitores[i]);
            }
        }
      }
    }

    console.log(this.monitoresRecomendados)

  }

  mirarProblemasHorarios(monitor: UsuarioGeneral){
    let interrumpe = false;
    let monitoriasDisponibles = new Array<Monitoria>();
    let horarios = new Array<Horario>();

    this.eventos = JSON.parse(localStorage.getItem("eventos"+this.logService.getUser().email));
    
    console.log("-->", this.eventos)
    let eventosMonitor = monitor.monitorDe;
    console.log("Monitor", eventosMonitor)
    console.log("Usuario", this.eventos)


    
      
      //console.log(this.eventos[i].id,"-> ", moment(this.eventos[i].startTime), " ", moment(this.eventos[i].endTime))

      for(let j=0; j<eventosMonitor.length; j++){
        for(let k=0; k<eventosMonitor[j].horarios.length; k++){
          
          let horarioInicialMonitor = moment(eventosMonitor[j].horarios[k].fi, "DD-MM-YYYY HH:mm")
          let horarioFinalMonitor = moment(eventosMonitor[j].horarios[k].ff, "DD-MM-YYYY HH:mm")
          let ocupado = false;

          try {
            for(let i=0; i<this.eventos.length && !ocupado; i++){
              console.log("Cantidad de eventos usuario ", this.eventos.length )
              console.log(moment(horarioInicialMonitor).format("DD-MM-YYYY HH:mm"), " ", moment(horarioFinalMonitor).format("DD-MM-YYYY HH:mm"), " ==== ", moment(this.eventos[i].startTime).format("DD-MM-YYYY HH:mm"), " ", moment(this.eventos[i].endTime).format("DD-MM-YYYY HH:mm"))
              if( moment(moment(this.eventos[i].startTime)).isBetween(horarioInicialMonitor, horarioFinalMonitor, undefined, '(]') || moment(moment(this.eventos[i].endTime)).isBetween(horarioInicialMonitor, horarioFinalMonitor, undefined, '[)') ){
                console.log(ocupado)
                ocupado = true;
              }
              else if( moment(moment(horarioInicialMonitor)).isBetween(moment(this.eventos[i].startTime), moment(this.eventos[i].endTime), undefined, '(]') || moment(moment(horarioFinalMonitor)).isBetween(moment(this.eventos[i].startTime),  moment(this.eventos[i].endTime), undefined, '[)')){
                ocupado = true;
              }
            }
            console.log("sale")
            
          } catch (error) {
            console.log("usuario sin eventos")
          }
          if(!ocupado){
            console.log("*********************Disponible")
            horarios.push(eventosMonitor[j].horarios[k])
            monitoriasDisponibles.push(eventosMonitor[j])
          }
          
            
        }
        
      
      
    }

/*
    for(let i=0; i<this.eventos.length; i++){
      let ocupado = false;
      console.log(this.eventos[i].id,"-> ", moment(this.eventos[i].startTime), " ", moment(this.eventos[i].endTime))

      for(let j=0; j<eventosMonitor.length; j++){
        for(let k=0; k<eventosMonitor[j].horarios.length; k++){
          let horarioInicialMonitor = moment(eventosMonitor[j].horarios[k].fi, "DD-MM-YYYY HH:mm")
          let horarioFinalMonitor = moment(eventosMonitor[j].horarios[k].ff, "DD-MM-YYYY HH:mm")

          console.log("Prueba ", moment(moment(this.eventos[i].startTime)).isBetween(horarioInicialMonitor, horarioFinalMonitor, undefined, '(]') , " ", moment(this.eventos[i].startTime).format("DD-MM-YYYY HH:mm") ," = (", horarioInicialMonitor.format("DD-MM-YYYY HH:mm"), ",", horarioFinalMonitor.format("DD-MM-YYYY HH:mm"), ")")

          if( !moment(moment(this.eventos[i].startTime)).isBetween(horarioInicialMonitor, horarioFinalMonitor, undefined, '(]') && !moment(moment(this.eventos[i].endTime)).isBetween(horarioInicialMonitor, horarioFinalMonitor, undefined, '[)')){
            console.log("Disponible")
            ocupado = true;
          }
        }
        
      }
      if(!ocupado){
        console.log("*********************esta")
        monitoriasDisponibles.push()
      }
    }

    
*/

    console.log("eventos posibles ", monitoriasDisponibles.length)
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
