import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  indice: number = 0;

  constructor(
    private calculadoraService: CalculadoraService,
    private activatedRoute: ActivatedRoute
  ) {}
  
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paraMap => {
      const recipeId = paraMap.get('tipId')
      this.indice = Number(recipeId);
      console.log("El indice", this.indice)
      if(recipeId != null){
        /*
        this.notasMaterias = this.calculadoraService.buscarNotas(Number(recipeId));
        this.nombreMateria = this.notasMaterias.nombreMateria;
        this.notas = this.notasMaterias.notas;
        this.notaEsperada = this.notasMaterias.notaEsperada;
        */
      }
      else{
        /*
        this.indice = -1;
        this.cantidadDeNotas = Number(this.calculadoraService.getcantidadDeNotas());
        this.notaEsperada = Number(this.calculadoraService.getnotaEsperada());
        this.nombreMateria = this.calculadoraService.getnombreMateria();
        this.definirCantidadDeNotas();
        */
      }
    })
  }

  guardarVar() {
    this.calculadoraService.addNotas(
      this.cantidadNotas,
      this.notaEsperada,
      this.nombreMateria
    );
  }
}
