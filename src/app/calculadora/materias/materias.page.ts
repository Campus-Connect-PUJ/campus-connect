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
    this.materias = this.calculadoraService.load();
    console.log("Entra en constructor", this.materias)
  }

  ngOnInit() {
    this.materias = this.calculadoraService.load();
  }

}


