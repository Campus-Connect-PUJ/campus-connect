import { Component, OnInit } from '@angular/core';
import { CalculadoraService } from'../shared/calculadora.service';
import {Nota, NotaConPorcentaje, NotasMateria} from '../shared/notas.model';
import {ActivatedRoute} from '@angular/router';
import { NumericValueAccessor } from '@ionic/angular';

@Component({
  selector: 'app-ingresar-notas',
  templateUrl: './ingresar-notas.page.html',
  styleUrls: ['./ingresar-notas.page.scss'],
})
export class IngresarNotasPage implements OnInit {
  private cantidadDeNotas: number;
  private notaEsperada: number;
  
  notas: NotaConPorcentaje[] = [];
  notasMaterias: NotasMateria;
  private valorPorcentaje: number;
  private valorNota: number;

  private notaActual: number = 0;
  private porcentajeFaltante: number = 0;
  private porcentajeActual: number = 0;
  private notaFaltante: number = 0;

  p_bar_value: number = 0;
  private porcentaje: number = 0;
  indice: number = 0;

  private nombreMateria: string;

  constructor(private calculadoraService: CalculadoraService,
              private activatedRoute: ActivatedRoute
              ) { 
                this.notaActual = 0;
                this.porcentajeFaltante = 0;
                this.notaFaltante = 0;
              }

  ngOnInit() {
    try {
      this.activatedRoute.paramMap.subscribe(paraMap => {
        const recipeId = paraMap.get('tipId')
        this.indice = Number(recipeId);
        if(recipeId != null){
          this.notasMaterias = this.calculadoraService.buscarNotas(Number(recipeId));
          
          this.nombreMateria = this.notasMaterias.nombreMateria;
          this.notas = this.notasMaterias.notas;
          this.notaEsperada = this.notasMaterias.notaEsperada;
          //this.notaEsperada = Number(this.calculadoraService.getnotaEsperada());
          this.runDeterminateProgress();
        }
        else{
          this.indice = -1;
          this.cantidadDeNotas = Number(this.calculadoraService.getcantidadDeNotas());
          this.notaEsperada = Number(this.calculadoraService.getnotaEsperada());
          this.nombreMateria = this.calculadoraService.getnombreMateria();
          console.log("los datos que llegan son ", this.cantidadDeNotas, " ",this.notaEsperada," ", this.nombreMateria)
          this.definirCantidadDeNotas();
        }
      })
    } catch (error) {
      this.cantidadDeNotas = Number(this.calculadoraService.getcantidadDeNotas());
      this.notaEsperada = Number(this.calculadoraService.getnotaEsperada());
    }
  }

  definirCantidadDeNotas(){
    for (let i = 0; i < this.cantidadDeNotas && this.cantidadDeNotas != this.notas.length; i++) {
      this.notas.push({
        notaObtenida: -1,
        porcentaje: 0
      })      
    }
  }

  changeFn1(e, indice) {
    console.log("antes", this.notas[indice].porcentaje)
    this.notas[indice].porcentaje = Number(e.target.value);
    console.log("despues", this.notas[indice].porcentaje)
    this.valorPorcentaje = Number(String(e.target.value));
    this.runDeterminateProgress()
  }

  changeFn2(e, indice) {
    this.valorNota=Number(String(e.target.value));
    this.notas[indice].notaObtenida = this.valorNota;
  }

  runDeterminateProgress() {
    this.porcentaje=0;
    let ciclo = 0;
    if(Number(this.cantidadDeNotas) > 0){
      ciclo = Number(this.cantidadDeNotas)
    }
    else{
      ciclo = this.notas.length;
    }
    for(let i = 0; i < ciclo; i++){
      this.porcentaje = this.notas[i].porcentaje + this.porcentaje;
    }
    this.p_bar_value = +this.porcentaje/100;
  }

  calcularNota(){
    console.log("Porcentajes", this.notas)
    let ciclo = 0;
    if(Number(this.cantidadDeNotas) > 0){
      //para nueva materia
      ciclo = Number(this.cantidadDeNotas)
    }
    else{
      //para una materia ya guardada
      ciclo = this.notas.length;
      this.notaEsperada = this.notasMaterias.notaEsperada;
    }

    this.notaActual = 0;
    this.porcentajeFaltante = 100;
    for(let i=0; i<ciclo; i++){
      if(this.notas[i].notaObtenida != NaN && this.notas[i].notaObtenida != -1 && this.notas[i].porcentaje != 0){
        this.notaActual = this.notaActual + (this.notas[i].notaObtenida * (this.notas[i].porcentaje/100));
        this.notaActual = parseFloat(this.notaActual.toFixed(3))
        this.porcentajeActual = this.notas[i].porcentaje + this.porcentajeActual;
        this.porcentajeFaltante = this.porcentajeFaltante - this.notas[i].porcentaje;
      }
      else{
        this.porcentajeFaltante = this.porcentajeFaltante + this.notas[i].porcentaje;
      }
    }
    this.notaFaltante = parseFloat(this.notaFaltante.toFixed(3) )
    console.log("calculo realizado", this.nombreMateria, " ", this.porcentajeFaltante,"% ", this.notaFaltante, " ", this.notaActual)
    this.calculadoraService.calculoRealizado(this.nombreMateria ,this.notaFaltante, this.porcentajeFaltante, this.notaEsperada, this.notas, this.indice, this.notaActual, this.porcentajeActual)
    if(this.indice!=-1){
      this.indice = -1;
    }
    this.calculadoraService.pantallaResultados(this.notaFaltante, this.porcentajeFaltante, this.notaEsperada);
    
  }
}
