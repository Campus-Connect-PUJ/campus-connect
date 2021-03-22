import { Component, OnInit } from '@angular/core';
import { CalculadoraService } from'../calculadora.service';
import {Nota, NotaConPorcentaje} from '../notas.model';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.page.html',
  styleUrls: ['./resultado.page.scss'],
})
export class ResultadoPage implements OnInit {
  private porcentajeFaltante: number = 0;
  private notaFaltante: number = 0;
  private notaEsperada: number;
  private porcentajeActual: number = 0;
  private notaActual: number = 0;
  constructor(private calculadoraService: CalculadoraService) { }

  ngOnInit() {
    this.porcentajeFaltante = this.calculadoraService.getporcentajeFaltante();
    this.notaFaltante = this.calculadoraService.getnotaFaltante();
    this.notaEsperada = this.calculadoraService.getnotaEsperada();
    this.porcentajeActual = this.calculadoraService.getporcentajeActual();
    this.notaActual = this.calculadoraService.getnotaActual();
    this.calculadoraService.load();
  }

  guardarMateria(){
    this.calculadoraService.guardar(this.calculadoraService.getnombreMateria(), this.notaEsperada, this.calculadoraService.getnotasVacias())
  }

  

}
