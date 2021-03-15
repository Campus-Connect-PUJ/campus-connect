import { Component, OnInit } from '@angular/core';
import { CalculadoraService } from'../calculadora.service';
import {Nota, NotaConPorcentaje, NotasMateria} from '../notas.model';
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

          console.log(this.notasMaterias)
          
          console.log("Las notas del numerito son", this.notasMaterias)
          this.notaEsperada = Number(this.calculadoraService.getnotaEsperada());
          
        }
        else{
          this.indice = -1;
          console.log("Hacer algo que no se ") 
          this.cantidadDeNotas = Number(this.calculadoraService.getcantidadDeNotas());
          this.notaEsperada = Number(this.calculadoraService.getnotaEsperada());
          this.nombreMateria = this.calculadoraService.getnombreMateria();
          this.definirCantidadDeNotas();
        }
      })
    } catch (error) {
      console.log(this.calculadoraService.getNotas());
      this.cantidadDeNotas = Number(this.calculadoraService.getcantidadDeNotas());
      this.notaEsperada = Number(this.calculadoraService.getnotaEsperada());
    }
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
    let ciclo = 0;
    if(Number(this.cantidadDeNotas) > 0){
      ciclo = Number(this.cantidadDeNotas)
    }
    else{
      ciclo = this.notas.length;
      console.log("Ciclo",ciclo);
      this.notaEsperada = this.notasMaterias.notaEsperada;
    }

    this.notaActual = 0;
    this.porcentajeFaltante = 0;
    for(let i=0; i<ciclo; i++){
      if(this.notas[i].notaObtenida != NaN && this.notas[i].notaObtenida != -1){
        this.notaActual = this.notaActual + (this.notas[i].notaObtenida * (this.notas[i].porcentaje/100));
      }
      else{
        this.porcentajeFaltante = this.porcentajeFaltante + this.notas[i].porcentaje;
      }
    }
    this.notaFaltante = this.notaEsperada - this.notaActual;
    console.log("falta ",this.notaFaltante, " en el ",this.porcentajeFaltante, "% para lograr la nota de ", this.notaEsperada)
    
    console.log("Este es el indice ", this.indice)
    if(this.indice!=-1){
      this.calculadoraService.calculoRealizadoCreado(this.nombreMateria, this.notaFaltante, this.porcentajeFaltante, this.notas, this.indice)
      this.calculadoraService.guardar(this.nombreMateria, this.notaEsperada, this.notas);
      
      this.indice = -1;
    }
    else{
      this.calculadoraService.calculoRealizado(this.nombreMateria ,this.notaFaltante, this.porcentajeFaltante, this.notas, this.indice)
      this.calculadoraService.guardar(this.nombreMateria, this.notaEsperada, this.notas);
    }
    
    this.calculadoraService.pantallaResultados(this.notaFaltante, this.porcentajeFaltante, this.notaEsperada);
    
  }
}
