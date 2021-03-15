import { Injectable } from '@angular/core';
import { Nota, NotaConPorcentaje, NotasMateria } from './notas.model';
import { Storage } from '@ionic/storage';
import { stringify } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class CalculadoraService {
  private nota: Nota[] = [];
  private cantidadDeNotas: String;
  private nombreMateria: string;
  private notaEsperada: String;
  private notaFaltante: number;
  private porcentajeFaltante: number;
  private notasVacias: NotaConPorcentaje[]= [];
  private controlNota: NotasMateria;
  private controlNotas: Array<NotasMateria>;
  private indice: number = 0;

  constructor(private storage: Storage) { 
  }

  getNotas(){
    return this.nota;
  }

  getcantidadDeNotas(){
    return this.cantidadDeNotas;
  }

  getnotaEsperada(){
    return this.notaEsperada;
  }

  getnombreMateria(){
    return this.nombreMateria;
  }

  getnotaFaltante(){
    return this.notaFaltante;
  }

  getporcentajeFaltante(){
    return this.porcentajeFaltante;
  }

  getcontrolNotas(){
    console.log("Aqui es dentro del servicio", this.controlNotas)
    return this.controlNotas;
  }

  addNotas(cantidad: string, notaEsperada: string, nombreMateria: string){
    console.log(cantidad, notaEsperada);
    this.nota.push({
      cantidad, 
      notaEsperada
    })
    this.cantidadDeNotas = cantidad;
    this.notaEsperada = notaEsperada;
    this.nombreMateria = nombreMateria;
    console.log("Hasta la calc va ", this.nombreMateria)
  }

  calculoRealizado(nombreMateria, nota, porcentaje, notas, index){
    this.notaFaltante = nota;
    this.porcentajeFaltante = porcentaje;
    this.indice = index;
    this.nombreMateria = nombreMateria;
  }

  calculoRealizadoCreado(nombreMateria, nota, porcentaje, notas, index){
    this.notaFaltante = nota;
    this.porcentajeFaltante = porcentaje;
    this.indice = index;
    this.nombreMateria = nombreMateria;
    
  }

  public guardar(nombreMateria, notaEsperada, notas){
    this.controlNota = new NotasMateria(nombreMateria, notaEsperada, notas);
    this.controlNotas = JSON.parse(localStorage.getItem("Materias"))

    try {
      if(this.controlNotas.length>=0){
        if(this.indice!=-1){
          this.controlNotas[this.indice] = this.controlNota;
        }
        else{
          this.controlNotas.push(this.controlNota)
        }
        localStorage.setItem("Materias", JSON.stringify(this.controlNotas))
      }
    } catch (error) {
      let controlNotas2: NotasMateria[] = 
        [{
          notaEsperada: undefined,
          nombreMateria: undefined,
          notas: this.notasVacias
        }];
      controlNotas2[0].nombreMateria = nombreMateria;
      controlNotas2[0].notaEsperada = notaEsperada;
      controlNotas2[0].notas = notas;
      localStorage.setItem("Materias", JSON.stringify(controlNotas2))
    }
  }

  public load(){
    this.controlNotas = JSON.parse(localStorage.getItem("Materias"))
    console.log("despues de cargar", this.controlNotas)
    return this.controlNotas;
  }

  public buscarNotas(indice: number){
    return this.controlNotas[indice];
  }

  pantallaResultados(notaFaltante, porcentajeFaltante, notaEsperada){
    this.notaFaltante = notaFaltante;
    this.porcentajeFaltante = porcentajeFaltante;
    this.notaEsperada = notaEsperada;
  }

}
