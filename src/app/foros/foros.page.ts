import { Component, OnInit } from '@angular/core';
import { Foro } from './foro';

@Component({
  selector: 'app-foros',
  templateUrl: './foros.page.html',
  styleUrls: ['./foros.page.scss'],
})
export class ForosPage implements OnInit {
  
  foros: Foro[] = [];


  constructor() { }

  ngOnInit() {
    this.cargarForos();
  }

  cargarForos(){
    //this.foros[0].descripcion = "Primer foro";
    this.foros[0].titulo = "Tiulo1";
    //this.foros[1].descripcion = "Segundo foro";
    this.foros[1].titulo = "Tiulo2";
    //this.foros[2].descripcion = "Tercer foro";
    this.foros[2].titulo = "Tiulo3";
  }


}
