import { Component, OnInit } from '@angular/core';
import { CalculadoraService } from'../calculadora/shared/calculadora.service';
import { NotasMateria } from '../calculadora/shared/notas.model';

@Component({
  selector: 'app-servicios-academicos',
  templateUrl: './servicios-academicos.page.html',
  styleUrls: ['./servicios-academicos.page.scss'],
})
export class ServiciosAcademicosPage implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  cargarNotas(){
    console.log("Entra a caargar")
  }
}
