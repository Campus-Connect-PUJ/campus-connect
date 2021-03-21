import { Component, OnInit } from '@angular/core';
import { CalculadoraService } from'../calculadora/calculadora.service';

@Component({
  selector: 'app-servicios-academicos',
  templateUrl: './servicios-academicos.page.html',
  styleUrls: ['./servicios-academicos.page.scss'],
})
export class ServiciosAcademicosPage implements OnInit {

  constructor(private calculadoraService: CalculadoraService) {
    this.calculadoraService.load();
   }

  ngOnInit() {
    this.calculadoraService.load();

  }
}
