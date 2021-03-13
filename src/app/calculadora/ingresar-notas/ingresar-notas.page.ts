import { Component, OnInit } from '@angular/core';
import { CalculadoraService } from'../calculadora.service';
import {Nota, NotaConPorcentaje} from '../notas.model';

@Component({
  selector: 'app-ingresar-notas',
  templateUrl: './ingresar-notas.page.html',
  styleUrls: ['./ingresar-notas.page.scss'],
})
export class IngresarNotasPage implements OnInit {
  private cantidadDeNotas: number;
  private notaEsperada: number;
  
  notas: NotaConPorcentaje[] = [];
  private valorPorcentaje: number;
  private valorNota: number;

  private notaActual: number = 0;
  private porcentajeFaltante: number = 0;
  private notaFaltante: number = 0;

  p_bar_value: number = 0;
  private porcentaje: number = 0;

  constructor(private calculadoraService: CalculadoraService) { }

  ngOnInit() {
    console.log(this.calculadoraService.getNotas());
    this.cantidadDeNotas = Number(this.calculadoraService.getcantidadDeNotas());
    this.notaEsperada = Number(this.calculadoraService.getnotaEsperada());
    this.definirCantidadDeNotas();
    console.log(this.notas)
  }

  definirCantidadDeNotas(){
    for (let i = 0; i < this.cantidadDeNotas; i++) {
      this.notas.push({
        notaObtenida: -1,
        porcentaje: 0
      })      
    }
  }

  changeFn1(e, indice) {
    this.notas[indice].porcentaje = Number(e.target.value);
    this.valorPorcentaje = Number(String(e.target.value));
    
  }

  changeFn2(e, indice) {
    this.valorNota=Number(String(e.target.value));
    this.notas[indice].notaObtenida = this.valorNota;
    this.runDeterminateProgress()
  }

  runDeterminateProgress() {
    this.porcentaje=0;
    for(let i = 0; i < Number(this.cantidadDeNotas); i++){
      this.porcentaje = this.notas[i].porcentaje + this.porcentaje;
    }
    this.p_bar_value = +this.porcentaje/100;
  }

  calcularNota(){
    this.notaActual = 0;
    this.porcentajeFaltante = 0;
    this.notaFaltante = 0;
    console.log(this.notas)

    for(let i=0; i<Number(this.cantidadDeNotas); i++){
      if(this.notas[i].notaObtenida != NaN && this.notas[i].notaObtenida != -1){
        this.notaActual = this.notaActual + (this.notas[i].notaObtenida * (this.notas[i].porcentaje/100));
      }
      else{
        this.porcentajeFaltante = this.porcentajeFaltante + this.notas[i].porcentaje;
      }
    }
    this.notaFaltante = this.notaEsperada - this.notaActual;
    console.log("falta ",this.notaFaltante, " en el ",this.porcentajeFaltante, "% para lograr la nota de ", this.notaEsperada)
    this.calculadoraService.save(this.notas);
    this.calculadoraService.calculoRealizado(this.notaFaltante, this.porcentajeFaltante)
  }
}
