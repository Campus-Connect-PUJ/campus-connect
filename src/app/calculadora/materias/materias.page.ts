import { Component, OnInit } from '@angular/core';
import { GuardsCheckStart } from '@angular/router';
import { Storage } from '@ionic/storage';
import { CalculadoraService } from'../calculadora.service';
import { NotasMateria } from '../notas.model';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.page.html',
  styleUrls: ['./materias.page.scss'],
})
export class MateriasPage {
  materias: Array<NotasMateria>;

  constructor(private calculadoraService: CalculadoraService) { 
    
    console.log("Entra en constructor", this.materias)
    this.materias = this.calculadoraService.load();
    this.materias = this.calculadoraService.load();
  }

  ngOnInit() {
    
    console.log("Entra en iniciador")
    this.materias = this.calculadoraService.load();
    this.materias = this.calculadoraService.load();
  }

}


