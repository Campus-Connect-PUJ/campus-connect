import { Component, OnInit } from '@angular/core';
import { CalculadoraService } from'../shared/calculadora.service';
import {Nota, NotaConPorcentaje, NotasMateria} from '../shared/notas.model';
import {ActivatedRoute, Router} from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


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
  constructor(
    private router: Router,
    private calculadoraService: CalculadoraService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(paraMap => {
      const recipeId = paraMap.get('tipId')
      this.indice = Number(recipeId);

      if(recipeId != null){
        this.notasMostrar = this.calculadoraService.findNotas(this.indice);
        this.porcentajeFaltante = 100-this.notasMostrar.porcentajeActual;
        this.notaFaltante = this.notasMostrar.notaEsperada - this.notasMostrar.notaActual;
        this.notaEsperada = this.notasMostrar.notaEsperada;
        this.porcentajeActual = this.notasMostrar.porcentajeActual;
        this.notaActual = this.notasMostrar.notaActual;
        this.nombreMateria = this.notasMostrar.nombreMateria;
        this.notasMateria = this.notasMostrar.notas;
        this.porcentajeActual = this.notasMostrar.porcentajeActual;
      } 
      else{
        this.porcentajeFaltante = this.calculadoraService.getporcentajeFaltante();
        this.notaFaltante = this.calculadoraService.getnotaFaltante();
        this.notaEsperada = this.calculadoraService.getnotaEsperada();
        this.porcentajeActual = this.calculadoraService.getporcentajeActual();
        this.notaActual = this.calculadoraService.getnotaActual();
        this.nombreMateria = this.calculadoraService.getnombreMateria();
        this.notasMateria = this.calculadoraService.getnotasVacias();
        this.porcentajeActual = this.calculadoraService.getporcentajeActual();
      }
      this.calculadoraService.load();
      })

  }

  guardarMateria(){
    this.calculadoraService.guardar(this.nombreMateria, this.notaEsperada, this.notasMateria, this.notaActual, this.porcentajeActual)
    this.router.navigate(['/calculadora/materias'
                          // '/tabs/servicios-academicos'
                         ]);
  }
  

}
