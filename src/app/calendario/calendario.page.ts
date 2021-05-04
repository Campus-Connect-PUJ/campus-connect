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
import { Lugares_universidad } from '../services/lugares_universidad';

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
  esMonitoria: boolean = false;
  esMonitor: boolean = false;
  asignaturas: Asignatura[] = [];
  asignatura: Asignatura;
  monitorias = new Array<Monitoria>();
  monitoria = new Monitoria();
  public lugares;
  lugar: string; 

  event = {
    title: '',
    desc: ' ',
    startTime: ' ',
    endTime: ' ',
    allDay: false,
    monitoria: false, 
    lugar: ' '
  };

  event2 = {
    title: '',
    desc: ' ',
    startTime: ' ',
    endTime: ' ',
    sTime: ' ',
    eTime: ' ',
    allDay: false,
    monitoria: false,
    lugar: ' '
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
  ) { 
    var lugaresUniversidad = new Lugares_universidad();
    this.lugares = lugaresUniversidad.getLugares();
  }

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
      monitoria: false,
      lugar: ' '
    };

    this.event2 = {
      title: '',
      desc: ' ',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      allDay: false,
      sTime: ' ',
      eTime: ' ',
      monitoria: false,
      lugar: ' '
    };
  }

  addEvent(){
    let cantidadDeEventos = 0;
    cantidadDeEventos = this.eventSource.length;
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
    eventCopy.monitoria= false

    if(eventCopy.allDay){
      let start = eventCopy.startTime;
      let end = eventCopy.endTime;

      eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
      eventCopy.endTime = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1));
    }

    this.eventSource.push(eventCopy);
    let a: evento;
    //this.eventSource.push(a);

    localStorage.setItem("eventos"+this.logService.getUser().email, JSON.stringify(this.eventSource))

    this.myCal.loadEvents();
    this.resetEvent();
  }

  addEventMateria(){

   
    let cantidadDeEventos = 0;
    cantidadDeEventos = this.eventSource.length;

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
    

    let fechaInicioTotal = moment(eventCopy2.startTime);
    let fechaFinTotal = moment(eventCopy2.endTime);
    let tiempos1 = eventCopy2.sTime.split(":");
    let tiempos2 = eventCopy2.eTime.split(":");

    fechaInicioTotal = moment(fechaInicioTotal).hour(Number(tiempos1[0]))
    let base = moment(eventCopy2.startTime);
    
    for(let i=0; moment(fechaInicioTotal).isBefore(fechaFinTotal); i=7){

      let horas = Number(tiempos2[0])- Number(tiempos1[0]);
      let minutos = Number(tiempos2[1])- Number(tiempos1[1]);



      eventCopy.title = eventCopy2.title;
      eventCopy.startTime = eventCopy2.startTime;
      eventCopy.monitoria = false;

      eventCopy.startTime = moment(eventCopy.startTime).subtract(eventCopy.startTime.getHours(), 'hours').toDate();
      eventCopy.startTime = moment(eventCopy.startTime).add(Number(tiempos1[0]),'hours').toDate();
      eventCopy.startTime = moment(eventCopy.startTime).subtract(eventCopy.startTime.getMinutes(), 'minutes').toDate();
      eventCopy.startTime = moment(eventCopy.startTime).add(Number(tiempos1[1]),'minutes').toDate();

      eventCopy.endTime = eventCopy.startTime;

      eventCopy.endTime = moment(eventCopy.endTime).subtract(eventCopy.endTime.getHours(), 'hours').toDate();
      eventCopy.endTime = moment(eventCopy.endTime).add(Number(tiempos2[0]),'hours').toDate();
      eventCopy.endTime = moment(eventCopy.endTime).subtract(eventCopy.endTime.getMinutes(), 'minutes').toDate();
      eventCopy.endTime = moment(eventCopy.endTime).add(Number(tiempos2[1]),'minutes').toDate();

      eventCopy.id = cantidadDeEventos;
      cantidadDeEventos++;

      localStorage.setItem(eventCopy.title, JSON.stringify(eventCopy))
      eventCopy = JSON.parse(localStorage.getItem(eventCopy.title));
      eventCopy.startTime = moment(eventCopy.startTime).toDate();
      eventCopy.endTime = moment(eventCopy.endTime).toDate();
      this.eventSource.push(eventCopy);
      localStorage.removeItem(eventCopy.title);
      fechaInicioTotal = moment(fechaInicioTotal).add(i,'days');
      eventCopy2.startTime = moment(eventCopy2.startTime).add(i,'days').toDate();
    }

    if(this.eventSource.length > 0){
      this.eventSource.pop()
    }
    

    localStorage.setItem("eventos"+this.logService.getUser().email, JSON.stringify(this.eventSource))
    this.myCal.loadEvents();
    this.resetEvent();
  }

  addMonitoria(){
    this.esMonitoria = true;
    let cantidadDeEventos = 0;
    cantidadDeEventos = this.eventSource.length;

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
    eventCopy.lugar = this.lugar;
    
    let eventCopy2 = {
      title: this.event2.title,
      startTime: new Date(this.event2.startTime),
      endTime: new Date(this.event2.endTime),
      allDay: this.event2.allDay,
      sTime: this.event2.sTime,
      eTime: this.event2.eTime,
      desc: this.event2.desc,
      id: cantidadDeEventos,
      monitoria: this.monitoria,
      lugar: this.lugar
    }
    
    if(this.esMonitoria){
      eventCopy.title = this.asignatura.nombre;
      eventCopy2.title = this.asignatura.nombre;
      //eventCopy.lugar = this.lugar;
    }

    let fechaInicioTotal = moment(eventCopy2.startTime);
    let fechaFinTotal = moment(eventCopy2.endTime);
    let tiempos1 = eventCopy2.sTime.split(":");
    let tiempos2 = eventCopy2.eTime.split(":");

    fechaInicioTotal = moment(fechaInicioTotal).hour(Number(tiempos1[0]))
    let base = moment(eventCopy2.startTime);
    let hora1 = moment(eventCopy2.sTime, "h:mm");
    let hora2 = moment(eventCopy2.eTime, "h:mm");

    if(moment(fechaInicioTotal).isSameOrBefore(fechaFinTotal)){
      for(let i=0; moment(fechaInicioTotal).isSameOrBefore(fechaFinTotal) ; i=7){
        
        let horas = Number(tiempos2[0])- Number(tiempos1[0]);
        let minutos = Number(tiempos2[1])- Number(tiempos1[1]);

  
        eventCopy.title = eventCopy2.title;
        eventCopy.startTime = eventCopy2.startTime;
        eventCopy.monitoria = true;
  
        eventCopy.startTime = moment(eventCopy.startTime).subtract(eventCopy.startTime.getHours(), 'hours').toDate();
        eventCopy.startTime = moment(eventCopy.startTime).add(Number(tiempos1[0]),'hours').toDate();
        eventCopy.startTime = moment(eventCopy.startTime).subtract(eventCopy.startTime.getMinutes(), 'minutes').toDate();
        eventCopy.startTime = moment(eventCopy.startTime).add(Number(tiempos1[1]),'minutes').toDate();
  
        eventCopy.endTime = eventCopy.startTime;
  
        eventCopy.endTime = moment(eventCopy.endTime).subtract(eventCopy.endTime.getHours(), 'hours').toDate();
        eventCopy.endTime = moment(eventCopy.endTime).add(Number(tiempos2[0]),'hours').toDate();
        eventCopy.endTime = moment(eventCopy.endTime).subtract(eventCopy.endTime.getMinutes(), 'minutes').toDate();
        eventCopy.endTime = moment(eventCopy.endTime).add(Number(tiempos2[1]),'minutes').toDate();
  
 
        eventCopy.id = cantidadDeEventos;
        cantidadDeEventos++;
  
        localStorage.setItem(eventCopy.title, JSON.stringify(eventCopy))
        eventCopy = JSON.parse(localStorage.getItem(eventCopy.title));
        eventCopy.startTime = moment(eventCopy.startTime).toDate();
        eventCopy.endTime = moment(eventCopy.endTime).toDate();
        this.eventSource.push(eventCopy);
        localStorage.removeItem(eventCopy.title);
        fechaInicioTotal = moment(fechaInicioTotal).add(i,'days');
        eventCopy2.startTime = moment(eventCopy2.startTime).add(i,'days').toDate();

      }
  
      if(this.eventSource.length > 0){
        this.eventSource.pop()
      }
    }
    else if(moment(hora1).isSameOrBefore(hora2)){
        let horas = Number(tiempos2[0])- Number(tiempos1[0]);
        let minutos = Number(tiempos2[1])- Number(tiempos1[1]);

        eventCopy.title = eventCopy2.title;
        eventCopy.startTime = eventCopy2.startTime;
        eventCopy.monitoria = true;
  
        eventCopy.startTime = moment(eventCopy.startTime).subtract(eventCopy.startTime.getHours(), 'hours').toDate();
        eventCopy.startTime = moment(eventCopy.startTime).add(Number(tiempos1[0]),'hours').toDate();
        eventCopy.startTime = moment(eventCopy.startTime).subtract(eventCopy.startTime.getMinutes(), 'minutes').toDate();
        eventCopy.startTime = moment(eventCopy.startTime).add(Number(tiempos1[1]),'minutes').toDate();
  
        eventCopy.endTime = eventCopy.startTime;
  
        eventCopy.endTime = moment(eventCopy.endTime).subtract(eventCopy.endTime.getHours(), 'hours').toDate();
        eventCopy.endTime = moment(eventCopy.endTime).add(Number(tiempos2[0]),'hours').toDate();
        eventCopy.endTime = moment(eventCopy.endTime).subtract(eventCopy.endTime.getMinutes(), 'minutes').toDate();
        eventCopy.endTime = moment(eventCopy.endTime).add(Number(tiempos2[1]),'minutes').toDate();
  

        eventCopy.id = cantidadDeEventos;
        cantidadDeEventos++;
  
        localStorage.setItem(eventCopy.title, JSON.stringify(eventCopy))
        eventCopy = JSON.parse(localStorage.getItem(eventCopy.title));
        eventCopy.startTime = moment(eventCopy.startTime).toDate();
        eventCopy.endTime = moment(eventCopy.endTime).toDate();
        this.eventSource.push(eventCopy);
        localStorage.removeItem(eventCopy.title);

    }

    

    localStorage.setItem("eventos"+this.logService.getUser().email, JSON.stringify(this.eventSource))
    this.myCal.loadEvents();
    this.resetEvent();
    this.esMonitoria = false;
  }

  enviarMonitoria(){
    for(let i = 0; i<this.monitorias.length; i++ ){
      this.moniService.crearMonitoria( this.monitorias[i]).subscribe(
        result => {
          console.log(result)
        },
        error => console.log(error)
      );
    }
  }

  enviarHorarios(){

    this.eventos = JSON.parse(localStorage.getItem("eventos"+this.logService.getUser().email));

    for(let i = 0; i < this.monitorias.length; i++){
      for(let j = 0; j< this.eventos.length; j++){
        if(this.eventos[j].title == this.monitorias[i].asignatura.nombre){
          let horario = new Horario();
          horario.fechaInicial = this.eventos[j].startTime;
          horario.fechaFinal = this.eventos[j].endTime;

          horario.fechaInicio = moment(this.eventos[j].startTime).format('DD-MM-YYYY HH:mm');
          horario.fechaFin = moment(this.eventos[j].endTime).format('DD-MM-YYYY HH:mm');
          horario.lugar = this.eventos[j].lugar;
          this.monitorias[i].horarios.push(horario)
        } 
      }
    }

    for(let i = 0; i<this.monitorias.length; i++ ){
      for(let j = 0; j<this.monitorias[i].horarios.length; j++ ){
        //console.log("Id asignatura", this.monitorias[j].asignatura.id)
        this.moniService.agregarHorario( this.monitorias[i], j).subscribe(
          result => console.log(result),
          error => console.log(error)
        );
      }
    }
  }



  enviarMonitorias(){
    this.eventos = JSON.parse(localStorage.getItem("eventos"+this.logService.getUser().email));

    let asignauras: Array<Asignatura>;
    
    for(let i=0; i<this.eventos.length; i++){
      let monitoria: Monitoria = new Monitoria();
      let asignatura: Asignatura = new Asignatura();
      let existe: boolean = false;
      if(this.eventos[i].monitoria){
        let idAsig = 0;
   
        for(let j=0; j<this.asignaturas.length; j++){
          if(this.asignaturas[j].nombre === this.eventos[i].title){
            idAsig = this.asignaturas[j].id;
            asignatura.id = idAsig;
            asignatura.nombre = this.asignaturas[j].nombre;
          }
        }
        
        monitoria.asignatura = asignatura;
        
        if(this.monitorias.length == 0){
          this.monitorias.push(monitoria)
        }
        else{
          for(let j=0; j<this.monitorias.length; j++){
            if(this.monitorias[j].asignatura.id == monitoria.asignatura.id){
              existe = true;
              this.monitorias[j].horarios.push();
            }
          }
          if(!existe){
            this.monitorias.push(monitoria)
          }
        }
      }
    }      
    this.enviarMonitoria();
  }


  cargarEventos(){
    this.eventos = JSON.parse(localStorage.getItem("eventos"+this.logService.getUser().email))
    try {
      for(let i=0; i<this.eventos.length; i++){
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

    //console.log(this.eventSource);
    //localStorage.removeItem("eventos");
    localStorage.setItem("eventos"+this.logService.getUser().email, JSON.stringify(this.eventSource))

    //this.myCal.loadEvents();
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
  }

  onEventSelected(aaaa){
    this.presentAlert(aaaa.id)
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
            for(let i=0; i< this.eventSource.length && a==0; i++){
              if(this.eventSource[i].id == indice ){
                a=i;
              }
            }

            this.borrarHorario(a);
            this.eventSource.splice(a,1)
            localStorage.setItem("eventos"+this.logService.getUser().email, JSON.stringify(this.eventSource))

            this.myCal.loadEvents();
          }
        }
      ]
    })
    await alert.present();
  }


  borrarHorario(indice: number){
    this.monitoria = new Monitoria();
    this.eventos = JSON.parse(localStorage.getItem("eventos"+this.logService.getUser().email));


    let horario = new Horario();
    let asig = new Asignatura();
    horario.fechaInicial = this.eventSource[indice].startTime;
    horario.fechaFinal = this.eventSource[indice].endTime;
    horario.fechaInicio = moment(this.eventSource[indice].startTime).format('DD-MM-YYYY HH:mm');
    horario.fechaFin = moment(this.eventSource[indice].endTime).format('DD-MM-YYYY HH:mm');
    this.monitoria.horarios.push(horario);

    for(let j=0; j<this.asignaturas.length; j++){
      if(this.asignaturas[j].nombre === this.eventSource[indice].title){
        asig.id = this.asignaturas[j].id;
        asig.nombre = this.asignaturas[j].nombre;
      }
    }
    this.monitoria.asignatura = asig;

    this.moniService.borrarHorario(this.monitoria).subscribe(
      result => console.log(result),
      error => console.log(error)
    )




  }
  

}
