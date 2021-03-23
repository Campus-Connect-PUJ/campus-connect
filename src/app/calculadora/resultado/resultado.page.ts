import { Component, OnInit } from '@angular/core';
import { CalculadoraService } from'../calculadora.service';
import {Nota, NotaConPorcentaje, NotasMateria} from '../notas.model';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.page.html',
  styleUrls: ['./resultado.page.scss'],
})
export class ResultadoPage implements OnInit {
  private notaEsperada: number;
  private porcentajeActual: number = 0;
  private notaActual: number = 0;
  private indice: number = 0;
  private nombreMateria: string;
  private notasMateria: NotaConPorcentaje[]= [];
  private porcentajeFaltante: number;
  private notaFaltante: number;

  notasMostrar: NotasMateria;
  constructor(private calculadoraService: CalculadoraService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(paraMap => {
      const recipeId = paraMap.get('tipId')
      this.indice = Number(recipeId);
      console.log("este es el indice ", this.indice)
      if(recipeId != null){
        this.notasMostrar = this.calculadoraService.findNotas(this.indice);
        console.log("Notas mostrar", this.notasMostrar);
        this.porcentajeFaltante = 100-this.notasMostrar.porcentajeActual;
        this.notaFaltante = this.notasMostrar.notaEsperada - this.notasMostrar.notaActual;
        this.notaEsperada = this.notasMostrar.notaEsperada;
        this.porcentajeActual = this.notasMostrar.porcentajeActual;
        this.notaActual = this.notasMostrar.notaActual;
        this.nombreMateria = this.notasMostrar.nombreMateria;
        this.notasMateria = this.notasMostrar.notas;
        this.calculadoraService.load();
      }
      else{
        this.porcentajeFaltante = this.calculadoraService.getporcentajeFaltante();
        this.notaFaltante = this.calculadoraService.getnotaFaltante();
        this.notaEsperada = this.calculadoraService.getnotaEsperada();
        this.porcentajeActual = this.calculadoraService.getporcentajeActual();
        this.notaActual = this.calculadoraService.getnotaActual();
        this.nombreMateria = this.calculadoraService.getnombreMateria();
        this.notasMateria = this.calculadoraService.getnotasVacias();
        this.calculadoraService.load();
        }
      })

  }

  guardarMateria(){
    console.log("Se van a guardar estos datos", this.nombreMateria, this.notaEsperada, this.notasMateria, this.porcentajeActual)
    this.calculadoraService.guardar(this.nombreMateria, this.notaEsperada, this.notasMateria, this.notaActual, this.porcentajeActual)
  }
  

}
