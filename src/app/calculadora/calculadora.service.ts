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
  }

  calculoRealizado(nota, porcentaje, notas){
    this.notaFaltante = nota;
    this.porcentajeFaltante = porcentaje;
    this.save(notas)
  }


  public save(notasIngresadas: NotaConPorcentaje[]){
    this.controlNota = new NotasMateria(this.nombreMateria, this.notaFaltante, notasIngresadas);
    this.controlNotas = JSON.parse(localStorage.getItem("Materias"))
    try {
      if(this.controlNotas.length>=0){
        console.log("Hace el push")
        this.controlNotas.push(this.controlNota)
        localStorage.setItem("Materias", JSON.stringify(this.controlNotas))
      }
    } catch (error) {
      console.log("Aqui entra")
      let controlNotas2: NotasMateria[] = 
      [{
      notaEsperada: undefined,
      nombreMateria: undefined,
      notas: this.notasVacias
      }
      ];
      controlNotas2[0].nombreMateria = this.nombreMateria;
      controlNotas2[0].notaEsperada = this.notaFaltante;
      controlNotas2[0].notas = notasIngresadas;
      localStorage.setItem("Materias", JSON.stringify(controlNotas2))
    }
    this.load();
  }

  public load(){
    this.controlNotas = JSON.parse(localStorage.getItem("Materias"))
    console.log("despues de cargar", this.controlNotas)
    return this.controlNotas;
  }

  public buscarNotas(index: number){
    this.controlNota = this.controlNotas[index]

    console.log("Aqui deberia traer lo antiguo", this.controlNota, this.controlNotas)

    return this.controlNota;
  }


}
