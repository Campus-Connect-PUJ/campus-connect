import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MonitoriaService } from 'src/app/Model/Monitoria/monitoria.service';
import { UsuarioGeneral } from 'src/app/Model/UsuarioGeneral/usuario-general';
import * as moment from 'moment';
import { Monitoria } from 'src/app/Model/Monitoria/monitoria';
import { evento } from 'src/app/calendario/evento';
import { Horario } from 'src/app/Model/Horario/horario';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-monitor-horarios',
  templateUrl: './monitor-horarios.page.html',
  styleUrls: ['./monitor-horarios.page.scss'],
})
export class MonitorHorariosPage implements OnInit {
  idMonitor = 0;
  horarios: Monitoria[] = [];
  horasInicial: string[] = [];
  horasFinal: string[] = [];
  monitores: Array<UsuarioGeneral> = [];
  usuarioActual: UsuarioGeneral;
  monitoresRecomendados:  Array<UsuarioGeneral> = [];
  eventos: evento[] = [];
  voto = 0;
  errorSi = false;

  monitor: UsuarioGeneral;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private monService: MonitoriaService,
    private logService: LoginService
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paraMap => {
      const recipeId = paraMap.get('monitorID')
      console.log(recipeId) 

      if(recipeId != null){
        console.log(recipeId)
        this.idMonitor = +recipeId;

        this.monService.obtenerMonitores().subscribe(
          result => {
            this.monitores = result;
            for(let i=0; i<this.monitores.length; i++){
              if(this.monitores[i].id == this.idMonitor){
                this.monitor = this.monitores[i];
              }
            }
            //this.monitores = this.ordenarMonitores(this.obtenerPuntajes(this.monitores))
            //this.sugerenciasMonitores(this.monitores)
            this.mirarProblemasHorarios(this.monitor)
          },
          error => console.log(error)
        )
        //this.findHorarios();
      }
      else{
        console.log("Lo otro")
      }

    })
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
    let monitoriasDisponibles = new Array<Monitoria>();
    let horarios = new Array<Horario>();
    this.eventos = JSON.parse(localStorage.getItem("eventos"+this.logService.getUser().email));
    let eventosMonitor = monitor.monitorDe;
  
    for(let j=0; j<eventosMonitor.length; j++){
      for(let k=0; k<eventosMonitor[j].horarios.length; k++){
        let horarioInicialMonitor = moment(eventosMonitor[j].horarios[k].fi, "DD-MM-YYYY HH:mm")
        let horarioFinalMonitor = moment(eventosMonitor[j].horarios[k].ff, "DD-MM-YYYY HH:mm")
        let ocupado = false;
        try {
          for(let i=0; i<this.eventos.length && !ocupado; i++){
            //console.log("Cantidad de eventos usuario ", this.eventos.length )
            //console.log(moment(horarioInicialMonitor).format("DD-MM-YYYY HH:mm"), " ", moment(horarioFinalMonitor).format("DD-MM-YYYY HH:mm"), " ==== ", moment(this.eventos[i].startTime).format("DD-MM-YYYY HH:mm"), " ", moment(this.eventos[i].endTime).format("DD-MM-YYYY HH:mm"))
            if( moment(moment(this.eventos[i].startTime)).isBetween(horarioInicialMonitor, horarioFinalMonitor, undefined, '(]') || moment(moment(this.eventos[i].endTime)).isBetween(horarioInicialMonitor, horarioFinalMonitor, undefined, '[)') ){
              ocupado = true;
            }
            else if( moment(moment(horarioInicialMonitor)).isBetween(moment(this.eventos[i].startTime), moment(this.eventos[i].endTime), undefined, '(]') || moment(moment(horarioFinalMonitor)).isBetween(moment(this.eventos[i].startTime),  moment(this.eventos[i].endTime), undefined, '[)')){
              ocupado = true;
            }
          }  
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
    console.log("eventos posibles ", horarios)
  }






  findHorarios(){
    this.monService.horariosMonitor(this.idMonitor).subscribe(
      result => {
        this.horarios = result;
        console.log(this.horarios);
        console.log(typeof(this.horarios[0].horarios[0].fechaInicial))
        for(let i=0; i<this.horarios.length; i++){
          for(let j=0; j<this.horarios[i].horarios.length; j++){
            var date = moment(this.horarios[i].horarios[j].fechaInicial).format('DD-MM-YYYY HH:mm')
            this.horarios[i].horarios[j].fi = date;
            date = moment(this.horarios[i].horarios[j].fechaFinal).format('DD-MM-YYYY HH:mm')
            this.horarios[i].horarios[j].ff = date;
          }
        }
        console.log(date)
    },
      error => console.error(error)
    )
  }


  enviarVoto(){
    if(this.voto > 5 || this.voto <= 0){
      this.errorSi = true;
    }
    else{
      this.errorSi = false;
      this.monService.votarMonitor(this.idMonitor,this.voto).subscribe(
        result => console.log(result),
        error => console.log(error)
      )

    }
    console.log("voto ", this.voto)
  }

}
