import { Injectable } from '@angular/core';
import { Nota } from './notas.model';

@Injectable({
  providedIn: 'root'
})
export class CalculadoraService {
  private nota: Nota[] = 
  [
  ];
  private cantidadDeNotas: String;
  private notaEsperada: String;

  constructor() { }

  getNotas(){
    return this.nota;
  }

  getcantidadDeNotas(){
    return this.cantidadDeNotas;
  }

  getnotaEsperada(){
    return this.notaEsperada;
  }

  addNotas(cantidad: string, notaEsperada: string ){
    console.log(cantidad, notaEsperada);
    this.nota.push({
      cantidad, 
      notaEsperada
    })
    this.cantidadDeNotas = cantidad;
    this.notaEsperada = notaEsperada;
    console.log(this.nota)
  }


}
