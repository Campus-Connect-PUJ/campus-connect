import { Component, OnInit } from '@angular/core';
import { CalculadoraService } from'../calculadora.service';
import {Nota, NotaConPorcentaje} from '../notas.model';

@Component({
  selector: 'app-ingresar-notas',
  templateUrl: './ingresar-notas.page.html',
  styleUrls: ['./ingresar-notas.page.scss'],
})
export class IngresarNotasPage implements OnInit {
  private cantidadDeNotas: String = "5";
  private notaEsperada: String;
  p_bar_value: number=0;
  notas: NotaConPorcentaje[] = [];
  private valorPorcentaje: String;
  private valorNota: String;
  private porcentaje: number = 0;

    private aaa: String = "prueba";
  constructor(private calculadoraService: CalculadoraService) { }

  ngOnInit() {
    console.log(this.calculadoraService.getNotas());
    this.cantidadDeNotas = this.calculadoraService.getcantidadDeNotas();
    this.notaEsperada = this.calculadoraService.getnotaEsperada();
    this.definirCantidadDeNotas();
    console.log(this.notas)
  }

  definirCantidadDeNotas(){
    for (let i = 0; i < Number(this.cantidadDeNotas); i++) {
      this.notas.push({
        notaObtenida: 0.0,
        porcentaje: 0
      })      
    }
  }

  changeFn1(e, indice) {
    console.log(e.target.value);
    this.notas[indice].porcentaje = Number(e.target.value);
    this.valorPorcentaje=String(e.target.value);
    this.runDeterminateProgress()
  }

  changeFn2(e, indice) {
    console.log(e);
    this.valorNota=String(e.target.value);
    this.notas[indice].notaObtenida = Number(this.valorNota);
    this.porcentaje=this.porcentaje+Number(this.valorPorcentaje);
    console.log("Notas->",this.notas)
  }

  runDeterminateProgress() {
    this.porcentaje=0;
    for(let i = 0; i < Number(this.cantidadDeNotas); i++){
      this.porcentaje = this.notas[i].porcentaje + this.porcentaje;
    }
    console.log("aaa", this.porcentaje)
    this.p_bar_value = +this.porcentaje/100;
  }
}
