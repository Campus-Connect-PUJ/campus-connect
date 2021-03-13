import { Component, OnInit } from '@angular/core';
import { GuardsCheckStart } from '@angular/router';
import { CalculadoraService } from'../calculadora.service';
import { NotasMateria } from '../notas.model';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.page.html',
  styleUrls: ['./materias.page.scss'],
})
export class MateriasPage {
  key: string = "materias"
  materias: NotasMateria;

  constructor(private calculadoraService: CalculadoraService ) { 
    
  }

  ngOnInit() {
    
  }

}


/* 
this.materias.notas.push({
      notaObtenida: 1,
      porcentaje: 20
    }, 
    {
      notaObtenida: 5,
      porcentaje: 20
    })
    this.materias.nombreMateria = "quimica";
    this.materias.notaEsperada = 3;
*/