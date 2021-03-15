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
  materias: NotasMateria[];

  constructor(private calculadoraService: CalculadoraService) { 
    this.calculadoraService.load();
    this.materias = this.calculadoraService.getcontrolNotas();
    console.log("ffff",this.materias)
  }

  ngOnInit() {
    
  }



}


