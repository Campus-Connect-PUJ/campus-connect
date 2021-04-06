import { Component, OnInit } from '@angular/core';
import { CalculadoraService } from'../shared/calculadora.service';
import { ActivatedRoute } from '@angular/router';
import { NumericValueAccessor } from '@ionic/angular';
import { NotaConPorcentaje, NotasMateria } from 'src/app/Model/Nota/nota';

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
  private ciclo: number = 0;

  constructor(
    private calculadoraService: CalculadoraService,
    private activatedRoute: ActivatedRoute
  ) {
    this.notaActual = 0;
    this.porcentajeFaltante = 0;
    this.notaFaltante = 0;
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paraMap => {
      const recipeId = paraMap.get('tipId')
      this.indice = Number(recipeId);
      if(recipeId != null){
        this.notasMaterias = this.calculadoraService.buscarNotas(Number(recipeId));
        this.nombreMateria = this.notasMaterias.nombreMateria;
        this.notas = this.notasMaterias.notas;
        this.notaEsperada = this.notasMaterias.notaEsperada;
        this.runDeterminateProgress();
      }
      else{
        this.indice = -1;
        this.cantidadDeNotas = Number(this.calculadoraService.getcantidadDeNotas());
        this.notaEsperada = Number(this.calculadoraService.getnotaEsperada());
        this.nombreMateria = this.calculadoraService.getnombreMateria();
        this.definirCantidadDeNotas();
      }
    })
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
    this.notas[indice].porcentaje = Number(e.target.value);
    this.runDeterminateProgress()
  }

  changeFn2(e, indice) {
    this.valorNota=Number(String(e.target.value));
    this.notas[indice].notaObtenida = this.valorNota;
  }

  runDeterminateProgress() {
    this.porcentaje=0;
    this.realizarCiclo()
    for(let i = 0; i < this.ciclo; i++){
      this.porcentaje = this.notas[i].porcentaje + this.porcentaje;
    }
    this.p_bar_value = +this.porcentaje/100;
  }

  realizarCiclo(){
    if(Number(this.cantidadDeNotas) > 0){
      //para nueva materia
      this.ciclo = Number(this.cantidadDeNotas)
    }
    else{
      //para una materia ya guardada
      this.ciclo = this.notas.length;
      this.notaEsperada = this.notasMaterias.notaEsperada;
    }
  }

  calcularNota(){
    this.notaActual = 0;
    this.porcentajeFaltante = 0;
    this.realizarCiclo();
    
    for(let i=0; i<this.ciclo; i++){
      if(this.notas[i].notaObtenida != NaN && this.notas[i].notaObtenida != -1 && this.notas[i].porcentaje != 0){
        this.notaActual = this.notaActual + (this.notas[i].notaObtenida * (this.notas[i].porcentaje/100));
        this.notaActual = parseFloat(this.notaActual.toFixed(3))
        this.porcentajeActual = this.notas[i].porcentaje + this.porcentajeActual;
      }
      else{
        this.porcentajeFaltante = this.porcentajeFaltante - this.notas[i].porcentaje;
      }
    }
    this.notaFaltante = parseFloat(this.notaFaltante.toFixed(3))
    this.calculadoraService.calculoRealizado(this.nombreMateria ,this.notaFaltante, Math.abs(this.porcentajeFaltante), this.notaEsperada, this.notas, this.indice, this.notaActual, this.porcentajeActual)
  }
}
