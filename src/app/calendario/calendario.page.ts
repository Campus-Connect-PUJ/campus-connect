import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar';
import { evento } from './evento';
import { AlertController } from '@ionic/angular';
import * as moment from 'moment';
import { LoginService } from '../services/login.service';
import { AsignaturaService } from '../Model/Asignatura/asignatura.service';
import { UsuarioGeneral } from '../Model/UsuarioGeneral/usuario-general';
import { Monitoria } from '../Model/Monitoria/monitoria';
import { Horario } from '../Model/Horario/horario';
import { Asignatura } from '../Model/Asignatura/asignatura';
import { title } from 'process';
import { MonitoriaService } from '../Model/Monitoria/monitoria.service';

export class listaEventos{
  title: string;
  desc: string;
  allDay: boolean;
  endTime: Date;
  startTime: Date;
  id: number;
  constructor(){    
  }
}

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit {

  public eventos: evento[] = [];
  monitoria: boolean = false;
  esMonitor: boolean = false;
  asignaturas: Asignatura[] = [];
  asignatura: Asignatura;
  monitorias = new Array<Monitoria>();

  event = {
    title: '',
    desc: ' ',
    startTime: ' ',
    endTime: ' ',
    allDay: false,
    monitoria: false
  };

  event2 = {
    title: '',
    desc: ' ',
    startTime: ' ',
    endTime: ' ',
    sTime: ' ',
    eTime: ' ',
    allDay: false,
    monitoria: false
  };

  minDate = new Date().toISOString;

  //eventSource = evento[];

  eventSource: Array<evento> = [];

  calendar = {
    mode: 'month',
    currenDate: new Date()
  }
  viewTitle = ' ';

  @ViewChild(CalendarComponent) myCal: CalendarComponent;
  
  constructor(public alertaCtrl: AlertController, 
    public logService: LoginService,
    public asigService: AsignaturaService,
    public moniService: MonitoriaService
  ) { }

  muchosEventos: listaEventos[] = [];

  ngOnInit() {
    this.cargarAsignaturas();
    this.resetEvent();
    this.cargarEventos();
    this.resetEvent();
  }

  cargarAsignaturas(){
    
    this.asigService.obtenerAsignaturas().subscribe(
      result => this.asignaturas = result,
      error => console.log(error)
    )
  }


  resetEvent(){
    this.event = {
      title: '',
      desc: ' ',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      allDay: false,
      monitoria: false
    };

    this.event2 = {
      title: '',
      desc: ' ',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      allDay: false,
      sTime: ' ',
      eTime: ' ',
      monitoria: false
    };
  }

  addEvent(){
    let cantidadDeEventos = 0;
    cantidadDeEventos = this.eventSource.length;
    if(cantidadDeEventos == null){
      cantidadDeEventos = 0;
    }

    console.log(this.event.startTime);

    let eventCopy: evento = new evento();



    eventCopy.title = this.event.title;
    eventCopy.startTime = new Date(this.event.startTime);
    eventCopy.endTime = new Date(this.event.endTime)
    eventCopy.allDay= this.event.allDay
    eventCopy.desc= this.event.desc
    eventCopy.id= cantidadDeEventos
    eventCopy.monitoria= false
    /*
    let eventCopy = {
      title: this.event.title,
      startTime: new Date(this.event.startTime),
      endTime: new Date(this.event.endTime),
      allDay: this.event.allDay,
      desc: this.event.desc,
      id: cantidadDeEventos,
      monitoria: false
    }
*/
    if(eventCopy.allDay){
      let start = eventCopy.startTime;
      let end = eventCopy.endTime;

      eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
      eventCopy.endTime = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1));
    }

    this.eventSource.push(eventCopy);
    let a: evento;
    this.eventSource.push(a);
    console.log(this.eventSource);
    localStorage.setItem("eventos", JSON.stringify(this.eventSource))

    this.myCal.loadEvents();
    this.resetEvent();
  }

  addEventMateria(){
    console.log("Seleccionado", this.monitoria, this.asignatura);
   
    let cantidadDeEventos = 0;
    cantidadDeEventos = this.eventSource.length;
    console.log("cantidad eventos ", cantidadDeEventos)
    if(cantidadDeEventos == null){
      cantidadDeEventos = 0;
    }


    let eventCopy: evento = new evento();
    eventCopy.title = this.event.title;

    eventCopy.startTime = new Date(this.event.startTime);
    eventCopy.endTime = new Date(this.event.endTime)
    eventCopy.allDay= this.event.allDay
    eventCopy.desc= this.event.desc
    eventCopy.id= cantidadDeEventos
    eventCopy.monitoria= this.event.monitoria

    /*
    let eventCopy = {
      title: this.event2.title,
      startTime: new Date(this.event2.startTime),
      endTime: new Date(this.event2.endTime),
      allDay: this.event2.allDay,
      desc: this.event2.desc,
      id: cantidadDeEventos,
      monitoria: this.monitoria
    }
    */


  
    
    let eventCopy2 = {
      title: this.event2.title,
      startTime: new Date(this.event2.startTime),
      endTime: new Date(this.event2.endTime),
      allDay: this.event2.allDay,
      sTime: this.event2.sTime,
      eTime: this.event2.eTime,
      desc: this.event2.desc,
      id: cantidadDeEventos,
      monitoria: this.monitoria
    }
    
    if(this.monitoria){
      console.log("Cambia")
      eventCopy.title = this.asignatura.nombre;
      eventCopy2.title = this.asignatura.nombre;
      console.log("*****")
    }

    let fechaInicioTotal = moment(eventCopy2.startTime);
    let fechaFinTotal = moment(eventCopy2.endTime);
    let tiempos1 = eventCopy2.sTime.split(":");
    let tiempos2 = eventCopy2.eTime.split(":");
    let a = 0;

    fechaInicioTotal = moment(fechaInicioTotal).hour(Number(tiempos1[0]))

    
    for(let i=0; moment(fechaInicioTotal).isBefore(fechaFinTotal); i=7){
      console.log("inicio", fechaInicioTotal, "final", fechaFinTotal);
      eventCopy = eventCopy2;
      eventCopy.startTime = moment(fechaInicioTotal).add(i,'days').toDate();
      let horas = Number(tiempos2[0])- Number(tiempos1[0]);
      let minutos = Number(tiempos2[1])- Number(tiempos1[1]);
      console.log("Horas ", horas)
      console.log("Minutos ", minutos)
      
      eventCopy.endTime = moment(eventCopy.startTime).add(horas,'hours').toDate();
      //eventCopy.endTime = moment(eventCopy.endTime).add(0,'minutes').toDate();
      //console.log("Diferencia de horas "+ eventCopy.endTime)
      console.log("Minutos", eventCopy.endTime.getMinutes())
      eventCopy.startTime = moment(eventCopy.startTime).subtract(eventCopy.startTime.getMinutes(), 'minutes').toDate();
      eventCopy.startTime = moment(eventCopy.startTime).add(Number(tiempos1[1]),'minutes').toDate();
      eventCopy.endTime = moment(eventCopy.endTime).subtract(eventCopy.endTime.getMinutes(), 'minutes').toDate();
      eventCopy.endTime = moment(eventCopy.endTime).add(Number(tiempos2[1]),'minutes').toDate();
      //console.log("Diferencia de minutos "+ eventCopy.endTime)
      eventCopy.id = cantidadDeEventos;
      cantidadDeEventos++;
      fechaInicioTotal = moment(fechaInicioTotal).add(i,'days');
      localStorage.setItem(eventCopy.title, JSON.stringify(eventCopy))
      eventCopy = JSON.parse(localStorage.getItem(eventCopy.title));
      eventCopy.startTime = moment(eventCopy.startTime).toDate();
      eventCopy.endTime = moment(eventCopy.endTime).toDate();
      this.eventSource.push(eventCopy);
      localStorage.removeItem(eventCopy.title);
    }


    if(!moment(fechaInicioTotal).isBefore(fechaFinTotal) ){
      this.eventSource.splice( this.eventSource.length-1, 1)
    }
    
    console.log("antes de grabar ->", this.eventSource)
    localStorage.setItem("eventos", JSON.stringify(this.eventSource))

    
    this.myCal.loadEvents();
    this.resetEvent();

  }

  enviarMonitoria(){
    for(let i = 0; i<this.monitorias.length; i++ ){
      this.moniService.crearMonitoria( this.logService.getUser().id, this.monitorias[i]).subscribe(
        result => {
          console.log(result)
        },
        error => console.log(error)
      );
    }
  }

  enviarHorarios(){
    for(let i = 0; i<this.monitorias.length; i++ ){
      for(let j = 0; j<this.monitorias[i].horarios.length; j++ ){
        //console.log("Id asignatura", this.monitorias[j].asignatura.id)
        this.moniService.agregarHorario( this.logService.getUser().id, this.monitorias[i], j).subscribe(
          result => console.log(result),
          error => console.log(error)
        );
      }
    }
  }



  enviarMonitorias(){
    this.eventos = JSON.parse(localStorage.getItem("eventos"));
    console.log("Lo que sale", this.eventos);

    for(let i=0; i<this.eventos.length; i++){
      let monitoria: Monitoria = new Monitoria();
      let asignatura: Asignatura = new Asignatura();
      let horario = new Horario();
      if(this.eventos[i].monitoria){
        let idAsig = 0;

        for(let j=0; j<this.asignaturas.length; j++){
          if(this.asignaturas[j].nombre === this.eventos[i].title){
            idAsig = this.asignaturas[j].id;
          }
        }

        asignatura.nombre = this.eventos[i].title;
        asignatura.id = idAsig;
        if(this.monitorias.length == 0){
          horario.fechaInicial = this.eventos[i].startTime;
          horario.fechaFinal = this.eventos[i].endTime;
          monitoria.usuario = this.logService.getUser();
          monitoria.asignatura = asignatura;
          monitoria.horarios.push(horario);
          this.monitorias.push(monitoria);
        }
        else{
          for(let j = 0; j<this.monitorias.length; j++){
            if(this.monitorias[j].asignatura.id == asignatura.id){
              //Agregar horario
              horario.fechaInicial = this.eventos[i].startTime;
              horario.fechaFinal = this.eventos[i].endTime;
              this.monitorias[j].horarios.push(horario);
            }
          }
        }

      }
    }

    console.log("Monitorias ->", this.monitorias)
      
    this.enviarMonitoria();


  }


    

    /*
    for(let i=0; i<monitorias.length; i++) {

      this.moniService.guardarMonitorias( this.logService.getUser().id, monitorias[i]).subscribe(
        result => console.log(result),
        error => console.log(error)
      );
    }
    
    */


  

  cargarEventos(){

    this.eventos = JSON.parse(localStorage.getItem("eventos"))
    console.log("Lo que sale", this.eventos);
    try {
      for(let i=0; i<this.eventos.length; i++){
        console.log("Monit -> ", this.eventos[i].monitoria, this.eventos[i].id)
        let eventCopy: evento = new evento();

        eventCopy.title = this.eventos[i].title;
        eventCopy.startTime = moment(this.eventos[i].startTime).toDate(),
        eventCopy.endTime = moment(this.eventos[i].endTime).toDate(),
        eventCopy.allDay= this.eventos[i].allDay,
        eventCopy.desc= this.event.desc
        eventCopy.id= this.eventos[i].id,
        eventCopy.monitoria= this.eventos[i].monitoria
        
        if(eventCopy.allDay){
          let start = eventCopy.startTime;
          let end = eventCopy.endTime;
    
          eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
          eventCopy.endTime = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1));
        }
        
    
        this.eventSource.push(eventCopy);
      }
    } catch (error) {
      console.log("nada")
    }

    console.log(this.eventSource);
    //localStorage.removeItem("eventos");
    localStorage.setItem("eventos", JSON.stringify(this.eventSource))
    console.log("Lo que sale 2", this.eventSource);
    //this.myCal.loadEvents();
  }

  onEventSelected(aaaa){
    console.log("->",aaaa)
    console.log("-->", aaaa.id)
    this.presentAlert(aaaa.id)
  }


  changeMode(mode){
    this.calendar.mode = mode;
    this.myCal.loadEvents();
  }

  back(){
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slidePrev();
  }

  next(){
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slideNext();
  }

  today(){
    this.calendar.currenDate = new Date();
  }

  onViewTitleChanged(title){
    this.viewTitle = title;
  }

  onTimeSelected(){

  }

  onClick(check){
    console.log(check)
  }

  
  async presentAlert(indice){
    const alert = await this.alertaCtrl.create({
      header: '¿Borrar Evento?',
      subHeader: 'Evento'+ (indice),
      message: 'Esta apunto de borrar el evento '+ (indice),
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Borrar',
          handler: () => {
            let a = 0;
            console.log("Antes", indice,this.eventSource)
            console.log(this.eventSource[0])
            for(let i=0; i< this.eventSource.length && a==0; i++){
              if(this.eventSource[i].id == indice ){
                a=i;
              }
            }
            this.eventSource.splice(a,1)
            console.log("Despues", indice,this.eventSource)
            localStorage.setItem("eventos", JSON.stringify(this.eventSource))
            this.myCal.loadEvents();
          }
        }
      ]
    })
    await alert.present();
  }
  

}
