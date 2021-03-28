import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar';
import { evento } from './evento.model';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit {

  public eventos: evento[] = [];

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
  
  constructor() { }

  ngOnInit() {
    this.resetEvent();

    this.cargarEventos();
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
    let eventCopy = {
      title: this.event.title,
      startTime: new Date(this.event.startTime),
      endTime: new Date(this.event.endTime),
      allDay: this.event.allDay,
      desc: this.event.desc
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

    for(let i=0; i<this.eventos.length; i++){
      let eventCopy = {
        title: this.eventos[i].title,
        startTime: new Date(this.eventos[i].startTime),
        endTime: new Date(this.eventos[i].endTime),
        allDay: this.eventos[i].allDay,
        desc: this.eventos[i].desc
      }
  
      if(eventCopy.allDay){
        let start = eventCopy.startTime;
        let end = eventCopy.endTime;
  
        eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
        eventCopy.endTime = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1));
      }
  
      this.eventSource.push(eventCopy);
    }

    

    console.log(this.eventSource);
    localStorage.setItem("eventos", JSON.stringify(this.eventSource))

    //this.myCal.loadEvents();


  }

  onEventSelected(){

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
}
