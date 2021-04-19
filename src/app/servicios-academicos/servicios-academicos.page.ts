  
import { Component, OnInit } from '@angular/core';
import { CalculadoraService } from'../calculadora/shared/calculadora.service';
import { ViewChild, Renderer2} from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-servicios-academicos',
  templateUrl: './servicios-academicos.page.html',
  styleUrls: ['./servicios-academicos.page.scss'],
})
export class ServiciosAcademicosPage implements OnInit {
  @ViewChild("myDiv") divView: ElementRef;
  colorList = ['green', 'blue'];

  constructor() {
    console.log("aaa1")
    //this.mostrarChat();
    
  }

  ngOnInit() {
    console.log("aaa2")
    this.mostrarChat();
    //let element = document.getElementsByClassName('chatbot') as HTMLCollectionOf<HTMLElement>;
    //element[0].style.display = 'inline';
    //element[0].style.marginBottom = '50px';
  }

  ngOnDestroy() {
    console.log("bbb")
  }

  updateColor(color) {
    document.documentElement.style.setProperty(`--color`, color);
  }

  mostrarChat(){
    console.log("Mostrar")
    let element = document.getElementsByClassName('chatbot') as HTMLCollectionOf<HTMLElement>;
    /*
    let shadow = element[0].shadowRoot;
    element[0].attachShadow({mode:"open"})
    shadow = element[0].shadowRoot;
    console.log("->", shadow);
    */
    element[0].style.display = 'flex';
    
  }

  quitarChat(){
    let element = document.getElementsByClassName('chatbot') as HTMLCollectionOf<HTMLElement>;
    element[0].style.display = 'none'
    element[0].style.marginBottom = '50px';
  }


}
