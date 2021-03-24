import { Component, OnInit } from '@angular/core';
import { CalculadoraService } from'./shared/calculadora.service';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.page.html',
  styleUrls: ['./calculadora.page.scss'],
})
export class CalculadoraPage implements OnInit {
  cantidadNotas: number;
  notaEsperada: number;
  nombreMateria: string;

  constructor(
    private calculadoraService: CalculadoraService
  ) {}
  ngOnInit() {
  }

  guardarVar(){
    this.calculadoraService.addNotas(this.cantidadNotas, this.notaEsperada, this.nombreMateria);
  }
}
