import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar';
import { evento } from './evento.model';
import { AlertController } from '@ionic/angular';
import * as moment from 'moment';
import { LoginService } from '../services/login.service';
import { UsuarioGeneral } from '../Model/UsuarioGeneral/usuario-general';

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

  data = [
    {
      name: 'Lunes',
      selected: false
    },
    {
      name: 'Martes',
      selected: false
    },
    {
      name: 'Miercoles',
      selected: false
    },
    {
      name: 'Jueves',
      selected: false
    },
    {
      name: 'Viernes',
      selected: false
    },
  ]

  event = {
    title: '',
    desc: ' ',
    startTime: ' ',
    endTime: ' ',
    allDay: false
  };

  event2 = {
    title: '',
    desc: ' ',
    startTime: ' ',
    endTime: ' ',
    sTime: ' ',
    eTime: ' ',
    allDay: false
  };

  minDate = new Date().toISOString;

  eventSource = [];

  calendar = {
    mode: 'month',
    currenDate: new Date()
  }
  viewTitle = ' ';

  @ViewChild(CalendarComponent) myCal: CalendarComponent;
  
  constructor(public alertaCtrl: AlertController, 
    public logService: LoginService
  ) { }

  muchosEventos: listaEventos[] = [];

  ngOnInit() {
    this.monitor();
    this.resetEvent();
    this.cargarEventos();
    this.resetEvent();
  }

  monitor(){
    let user = new UsuarioGeneral(" ","","");
    user = this.logService.getUser();
    if(user.rol == "MONITOR"){
      this.esMonitor = true;
    }
  }

  resetEvent(){
    this.event = {
      title: '',
      desc: ' ',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      allDay: false
    };

    this.event2 = {
      title: '',
      desc: ' ',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      allDay: false,
      sTime: ' ',
      eTime: ' ',
    };
  }

  addEvent(){
    let cantidadDeEventos = 0;
    cantidadDeEventos = this.eventSource.length;
    if(cantidadDeEventos == null){
      cantidadDeEventos = 0;
    }

    console.log(this.event.startTime)
    let eventCopy = {
      title: this.event.title,
      startTime: new Date(this.event.startTime),
      endTime: new Date(this.event.endTime),
      allDay: this.event.allDay,
      desc: this.event.desc,
      id: cantidadDeEventos
    }

    if(eventCopy.allDay){
      let start = eventCopy.startTime;
      let end = eventCopy.endTime;

      eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
      eventCopy.endTime = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1));
    }

    this.eventSource.push(eventCopy);
    console.log(this.eventSource);
    localStorage.setItem("eventos", JSON.stringify(this.eventSource))

    this.myCal.loadEvents();
    this.resetEvent();
  }

  addEventMateria(){
    console.log("Seleccionado", this.monitoria);
    let cantidadDeEventos = 0;
    cantidadDeEventos = this.eventSource.length;
    console.log("cantidad eventos ", cantidadDeEventos)
    if(cantidadDeEventos == null){
      cantidadDeEventos = 0;
    }

    let eventCopy = {
      title: this.event2.title,
      startTime: new Date(this.event2.startTime),
      endTime: new Date(this.event2.endTime),
      allDay: this.event2.allDay,
      desc: this.event2.desc,
      id: cantidadDeEventos
    }

    let eventCopy2 = {
      title: this.event2.title,
      startTime: new Date(this.event2.startTime),
      endTime: new Date(this.event2.endTime),
      allDay: this.event2.allDay,
      sTime: this.event2.sTime,
      eTime: this.event2.eTime,
      desc: this.event2.desc,
      id: cantidadDeEventos
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
      eventCopy.endTime = moment(eventCopy.startTime).add(Number(tiempos2[0])- Number(tiempos1[0]),'hours').toDate();
      eventCopy.endTime = moment(eventCopy.endTime).add(Number(tiempos2[1])- Number(tiempos1[1]),'minutes').toDate();
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
    
    localStorage.setItem("eventos", JSON.stringify(this.eventSource))

    
    this.myCal.loadEvents();
    this.resetEvent();

  }

  cargarEventos(){

    this.eventos = JSON.parse(localStorage.getItem("eventos"))
    console.log("Lo que sale", this.eventos);
    try {
      for(let i=0; i<this.eventos.length; i++){
        let eventCopy = {
          title: this.eventos[i].title,
          startTime: new Date(this.eventos[i].startTime),
          endTime: new Date(this.eventos[i].endTime),
          allDay: this.eventos[i].allDay,
          desc: this.eventos[i].desc,
          id: this.eventos[i].id
        }

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
    localStorage.setItem("eventos", JSON.stringify(this.eventSource))

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
