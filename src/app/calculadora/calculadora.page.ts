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
