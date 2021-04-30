import { Component, OnInit } from '@angular/core';
import { CalculadoraService } from'../shared/calculadora.service';
import { ActivatedRoute, Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { NotaConPorcentaje, NotasMateria } from 'src/app/Model/Nota/nota';

export class mensaje{
  mensaje: string;
  nota: number;
  nivel: number[];
  constructor(){

  }
}

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
  private mensaje: mensaje = new mensaje();
  private mensajes: mensaje[] = [
    {
      mensaje: "A",
      nota: 5,
      nivel: [1,2,3]
    },
    {
      mensaje: "B",
      nota: 4,
      nivel: [2,3]
    },
    {
      mensaje: "C",
      nota: 3,
      nivel: [3]
    },
    {
      mensaje: "D",
      nota: 2,
      nivel: [2]
    },
    {
      mensaje: "E",
      nota: 1,
      nivel: [1,2]
    },
    {
      mensaje: "F",
      nota: 0,
      nivel: [1]
    }
  ];

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
      this.determinarMensaje();
      })
      
  }

  guardarMateria(){
    this.calculadoraService.guardar(this.nombreMateria, this.notaEsperada, this.notasMateria, this.notaActual, this.porcentajeActual)
    this.router.navigate(['/calculadora/materias'
                          // '/tabs/servicios-academicos'
                         ]);
  }

  determinarMensaje(){
    console.log("-",this.notaFaltante)
    for(let i=0; i<this.mensajes.length; i++){
      if(this.mensajes[i].nota >= this.notaFaltante){
        this.mensaje.mensaje = this.mensajes[i].mensaje;
        this.mensaje.nota = this.mensajes[i].nota;
      }
    }
    console.log(this.mensaje)

  }
  

}
