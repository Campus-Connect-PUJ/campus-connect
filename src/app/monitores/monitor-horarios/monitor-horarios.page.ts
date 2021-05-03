import { HorarioMonitoria } from './HorarioMonitoria';
import { Asignatura } from './../../Model/Asignatura/asignatura';
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
  
  horasInicial: string[] = [];
  horasFinal: string[] = [];
  monitores: Array<UsuarioGeneral> = [];
  usuarioActual: UsuarioGeneral;
  monitoresRecomendados:  Array<UsuarioGeneral> = [];
  eventos: evento[] = [];
  voto = 0;
  errorSi = false;

  monitor: UsuarioGeneral = new UsuarioGeneral(" ", " ", " ");
  asignaturas: Array<Monitoria> = [];
  horariosSugeridos: Array<HorarioMonitoria> = [];
  horariosLimitados: Array<HorarioMonitoria> = [];
  horarios: Monitoria[] = [];
  cantidadDeSugerencias: Array<Number> = [1,3,5,10,20,50,100];
  cantidadDeSugerenciasSeleccionadas: Number = 3;

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
        this.iniciarMonitor();

      }
      else{
        console.log("Lo otro")
      }

    })
  }

  iniciarMonitor(){
    this.monService.obtenerMonitores().subscribe(
      result => {
        this.monitores = result;
        for(let i=0; i<this.monitores.length; i++){
          if(this.monitores[i].id == this.idMonitor){
            this.monitor = this.monitores[i];
          }
        }
        this.sugerenciasHorariosMonitorias(this.monitor)
        this.obtenerAsignaturas(this.monitor)
        this.obtenerPuntajes(this.monitores)
        console.log(this.monitor)
      },
      error => console.log(error)
    )
  }

  obtenerAsignaturas(monitor: UsuarioGeneral){
    let ingresar = true;
    for(let i=0; i<monitor.monitorDe.length; i++){
      if(this.asignaturas.length == 0){
        this.asignaturas.push(monitor.monitorDe[i])
      }
      else{
        for(let j=0; j<this.asignaturas.length && ingresar; j++){
          if(monitor.monitorDe[i].id == this.asignaturas[j].id){
            ingresar = false;
          }
        }
        if(ingresar){
          this.asignaturas.push(monitor.monitorDe[i])
        }
      }
    }
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


  sugerenciasHorariosMonitorias(monitor: UsuarioGeneral){
    let monitoriasDisponibles = new Array<Monitoria>();
    let horarios = new Array<Horario>();
    let fechaReferencia = moment();
    fechaReferencia = moment(fechaReferencia).add(30,'days');

    this.eventos = JSON.parse(localStorage.getItem("eventos"+this.logService.getUser().email));
    let eventosMonitor = monitor.monitorDe;
  
    for(let j=0; j<eventosMonitor.length; j++){
      for(let k=0; k<eventosMonitor[j].horarios.length; k++){
        let horarioInicialMonitor = moment(eventosMonitor[j].horarios[k].fechaInicio, "DD-MM-YYYY HH:mm")
        let horarioFinalMonitor = moment(eventosMonitor[j].horarios[k].fechaFin, "DD-MM-YYYY HH:mm")
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
          //Cancelar cuando ya sean varios eventos sugeridos
          //if( moment(horarioInicialMonitor).isSameOrBefore(fechaReferencia) && moment(horarioFinalMonitor).isSameOrBefore(fechaReferencia)){
            this.agregarHorariosSugeridos(eventosMonitor[j], eventosMonitor[j].horarios[k]);
         // }

        }   
      }
    }
    
    this.ordenarSugerencias();
    console.log("eventos posibles ", this.horariosSugeridos)
    
 
  }

  ordenarSugerencias(){
    console.log("entra")
    let sugerenciasOrdenadas = this.horariosSugeridos;
    let sugerencias = new Array<HorarioMonitoria>();
    console.log("-->", this.cantidadDeSugerenciasSeleccionadas)
    console.log("sin ordenas", sugerenciasOrdenadas)

    sugerenciasOrdenadas.sort(function (a, b) {
      if( moment(moment(a.fechaInicio, "DD-MM-YYYY HH:mm")).isBefore(moment(b.fechaInicio, "DD-MM-YYYY HH:mm")) ){
        console.log(1)
        return -1;
      }
      if( !moment(moment(a.fechaInicio, "DD-MM-YYYY HH:mm")).isBefore(moment(b.fechaInicio, "DD-MM-YYYY HH:mm"))){

        return 1;
      }
      // a must be equal to b
      return 0;
    });
    
    console.log("ordenas", sugerenciasOrdenadas)
    
    this.horariosSugeridos = sugerenciasOrdenadas;
    this.limitarSugerencias();
  }


  limitarSugerencias(){
    this.horariosLimitados = [];
    let sugerenciasOrdenadas = this.horariosSugeridos;
    let sugerencias = new Array<HorarioMonitoria>();

    if(sugerenciasOrdenadas.length >= this.cantidadDeSugerenciasSeleccionadas){
      for(let i=0; i<this.cantidadDeSugerenciasSeleccionadas; i++){
        sugerencias.push(sugerenciasOrdenadas[i])
      }
      sugerenciasOrdenadas = sugerencias;
    }
    this.horariosLimitados = sugerenciasOrdenadas;
  }






  agregarHorariosSugeridos(datos: Monitoria, horario: Horario) {
    let data: HorarioMonitoria = new HorarioMonitoria();
    let ingresar = true;
    data.id = horario.id;
    data.nombreAsignatura = datos.asignatura.nombre;
    data.fechaInicio = horario.fechaInicio;
    data.fechaFin = horario.fechaFin;

    if(this.horariosSugeridos.length==0){
      this.horariosSugeridos.push(data);
    }
    else{
      for(let i=0; i<this.horariosSugeridos.length; i++){
        if(this.horariosSugeridos[i].id == data.id){
          ingresar = false;
        }
      }
      if(ingresar){
        this.horariosSugeridos.push(data);
      }
    }
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
            this.horarios[i].horarios[j].fechaInicio = date;
            date = moment(this.horarios[i].horarios[j].fechaFinal).format('DD-MM-YYYY HH:mm')
            this.horarios[i].horarios[j].fechaFin = date;
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
        result => {
          console.log(result)
          this.iniciarMonitor()
        },
        error => console.log(error)
      )

    }
    console.log("voto ", this.voto)
    

  }

}
