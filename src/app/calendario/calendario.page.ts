import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar';
import { evento } from './evento.model';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit {



  public eventos: evento[] = [];

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

  minDate = new Date().toISOString;

  eventSource = [];

  calendar = {
    mode: 'month',
    currenDate: new Date()
  }
  viewTitle = ' ';

  @ViewChild(CalendarComponent) myCal: CalendarComponent;
  
  constructor(public alertaCtrl: AlertController) { }

  ngOnInit() {
    this.resetEvent();
    this.cargarEventos();
    this.resetEvent();
  }

  resetEvent(){
    this.event = {
      title: '',
      desc: ' ',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      allDay: false
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
      header: '¿Borrar materia?',
      subHeader: 'Materia'+ (indice),
      message: 'Esta apunto de borrar la materia '+ (indice),
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
            console.log("Antes", indice,this.eventSource)
            this.eventSource.splice(indice,1)
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
