import { Component, OnInit } from '@angular/core';
import { CalculadoraService } from'../calculadora/shared/calculadora.service';
import { ViewChild, Renderer2} from '@angular/core';

@Component({
  selector: 'app-servicios-academicos',
  templateUrl: './servicios-academicos.page.html',
  styleUrls: ['./servicios-academicos.page.scss'],
})
export class ServiciosAcademicosPage implements OnInit {

  constructor(private renderer: Renderer2) {
  }

  ngOnInit() {
  }

  cambiarEstado(){
    console.log("aaaaa")
    const parent: HTMLElement = document.getElementById('bot');
    this.renderer.setStyle(parent, 'display', 'none');
  }

}
