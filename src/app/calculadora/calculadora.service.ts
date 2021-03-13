import { Injectable } from '@angular/core';
import { Nota, NotaConPorcentaje, NotasMateria } from './notas.model';
import { Storage } from '@ionic/storage';
import { stringify } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class CalculadoraService {
  private nota: Nota[] = 
  [
  ];
  private cantidadDeNotas: String;
  private notaEsperada: String;
  private notaFaltante: number;
  private porcentajeFaltante: number;
  private notasVacias: NotaConPorcentaje[]= [];
  private controlNotas: NotasMateria = 
  {
    notaEsperada: undefined,
    nombreMateria: undefined,
    notas: this.notasVacias
  };


  constructor(private storage: Storage) { }

  getNotas(){
    return this.nota;
  }

  getcantidadDeNotas(){
    return this.cantidadDeNotas;
  }

  getnotaEsperada(){
    return this.notaEsperada;
  }

  getnotaFaltante(){
    return this.notaFaltante;
  }

  getporcentajeFaltante(){
    return this.porcentajeFaltante;
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

  calculoRealizado(nota, porcentaje){
    this.notaFaltante = nota;
    this.porcentajeFaltante = porcentaje;
  }

  public save(notasIngresadas: NotaConPorcentaje[]){
    this.controlNotas.nombreMateria = "Algo";
    this.controlNotas.notaEsperada = 3;
    this.controlNotas.notas = notasIngresadas;
    console.log("->>>>",this.controlNotas);
    this.storage.set("Quimica", this.controlNotas)
    this.load();
  }

  public async load(){
    console.log("aaaa", this.storage.get("Quimica"));
    this.storage.get("Quimica").then((val)=> {console.log('Your name',val);})
  }

}
