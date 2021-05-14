import { UsuarioGeneral } from 'src/app/Model/UsuarioGeneral/usuario-general';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar';
import { evento } from './evento';
import { AlertController } from '@ionic/angular';
import * as moment from 'moment';
import { LoginService } from '../services/login.service';
import { AsignaturaService } from '../Model/Asignatura/asignatura.service';
import { Monitoria } from '../Model/Monitoria/monitoria';
import { Horario } from '../Model/Horario/horario';
import { Asignatura } from '../Model/Asignatura/asignatura';
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
  public usuario: UsuarioGeneral;

  public eventos: evento[] = [];
  esMonitoria: boolean = false;
  esMonitor: boolean = false;
  asignaturas: Asignatura[] = [];
  asignatura: Asignatura;
  monitorias = new Array<Monitoria>();
  monitoria = new Monitoria();
  public lugares;
  lugar: string = " "; 

  public collapseCard: boolean;
  public collapseCard2: boolean;
  public collapseCard3: boolean;

  public desactivado: boolean;

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
  eventosNuevos: Array<evento> = [];
  muchosEventos: listaEventos[] = [];

  calendar = {
    mode: 'month',
    currentDate: new Date()
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
    this.esMonitoria = false;

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
    
    for(let i=0; moment(fechaInicioTotal).isBefore(fechaFinTotal); i=7){

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
    let eventCopy: evento = new evento();


    cantidadDeEventos = this.eventSource.length;
    if(cantidadDeEventos == null){
      cantidadDeEventos = 0;
    }
    let eventCopy2 = {
      title: this.event2.title,
      startTime: new Date(this.event2.startTime),
      endTime: new Date(this.event2.endTime),
      allDay: this.event2.allDay,
      sTime: this.event2.sTime,
      eTime: this.event2.eTime,
      desc: this.event2.desc,
      id: cantidadDeEventos,
      monitoria: this.esMonitoria ,
      lugar: this.lugar
    }

    if(eventCopy2.sTime > eventCopy2.eTime || eventCopy2.lugar == " "){
      this.desactivado = true;
      console.log(this.desactivado)
      return;
    }
    else{
      this.desactivado = false;
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
    let hora1 = moment(eventCopy2.sTime, "h:mm");
    let hora2 = moment(eventCopy2.eTime, "h:mm");

    if(moment(fechaInicioTotal).isSameOrBefore(fechaFinTotal)){
      for(let i=0; moment(fechaInicioTotal).isSameOrBefore(fechaFinTotal) ; i=7){
        eventCopy.title = eventCopy2.title;
        eventCopy.startTime = eventCopy2.startTime;
        eventCopy.monitoria = true;
        eventCopy.lugar = eventCopy2.lugar;
  
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
        this.eventosNuevos.push(eventCopy);
        localStorage.removeItem(eventCopy.title);
        fechaInicioTotal = moment(fechaInicioTotal).add(i,'days');
        eventCopy2.startTime = moment(eventCopy2.startTime).add(i,'days').toDate();

      }
  
      if(this.eventSource.length > 0){
        this.eventSource.pop()
      }
    }
    else if(moment(hora1).isSameOrBefore(hora2)){
        eventCopy.title = eventCopy2.title;
        eventCopy.startTime = eventCopy2.startTime;
        eventCopy.monitoria = true;
        eventCopy.lugar = eventCopy2.lugar;

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
        this.eventosNuevos.push(eventCopy);
        localStorage.removeItem(eventCopy.title);

    }

    localStorage.setItem("nuevosEventos", JSON.stringify(this.eventosNuevos));
    localStorage.setItem("eventos"+this.logService.getUser().email, JSON.stringify(this.eventSource))
    this.myCal.loadEvents();
    this.resetEvent();
    this.esMonitoria = false;

    //this.enviarMonitorias();
    this.nuevaMonitoria();
  }


  nuevaMonitoria(){
    this.esMonitoria = true;
    this.eventosNuevos = JSON.parse(localStorage.getItem("nuevosEventos"));
    console.log(this.eventosNuevos)
    this.usuario = this.logService.getUser();

    let monitoria: Monitoria = new Monitoria();
    let asignatura: Asignatura = new Asignatura();
    let existe = false;
    
    
    asignatura.nombre = this.eventosNuevos[0].title;

    for(let i=0; i<this.asignaturas.length; i++){
      if(asignatura.nombre == this.asignaturas[i].nombre){
        asignatura = this.asignaturas[i];
      }
    }

    for(let i=0; i<this.usuario.monitorDe.length; i++){
      if(this.usuario.monitorDe[i].asignatura.nombre == asignatura.nombre){
        existe = true;
        monitoria = this.usuario.monitorDe[i];
      }
    }

    if(existe){
      //Agregar horario
      console.log("Se agregan horarios")
      this.enviarHorariosNuevo(monitoria);
    }
    else{
      //crear desde 0
      console.log("Se crea monitoria")
      let monitoriaNueva: Monitoria = new Monitoria();
      monitoriaNueva.asignatura = asignatura;
      this.moniService.crearMonitoria(monitoriaNueva).subscribe(
          result => {
            console.log(result)
            console.log("se creo la monitoria")
            this.enviarHorariosNuevo(monitoriaNueva);
            },
            error => console.log(error)
          );
      }
    this.logService.storeUser(this.usuario, this.logService.getToken());
  }

  enviarHorariosNuevo(monitoria: Monitoria){
    let monitoriaNueva: Monitoria = new Monitoria();
    monitoriaNueva.asignatura = monitoria.asignatura;
    
    console.log(this.eventosNuevos)
    for(let i=0; i<this.eventosNuevos.length; i++){
      let horario = new Horario();
      horario.fechaInicial = this.eventosNuevos[i].startTime;
      horario.fechaFinal = this.eventosNuevos[i].endTime;
      horario.lugar = this.eventosNuevos[i].lugar;
      monitoriaNueva.horarios.push(horario);
    }

    console.log("los horarios son", this.eventosNuevos.length, " ", monitoria)
    for(let i=0; i<this.eventosNuevos.length; i++){
      
      this.moniService.agregarHorario(monitoriaNueva, i).subscribe(
        result => console.log(result),
        error => console.log(error)      
      )
      
    }
    this.eventosNuevos = [];
    localStorage.removeItem("nuevosEventos");
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
        eventCopy.lugar = this.eventos[i].lugar
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
    this.calendar.currentDate = new Date();
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
