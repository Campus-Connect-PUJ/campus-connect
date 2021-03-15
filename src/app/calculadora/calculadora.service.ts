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
  private notaEsperada: String;
  private notaFaltante: number;
  private porcentajeFaltante: number;
  private notasVacias: NotaConPorcentaje[]= [];
  private controlNota: NotasMateria;
  private controlNotas: NotasMateria[] = 
    [{
      notaEsperada: undefined,
      nombreMateria: undefined,
      notas: this.notasVacias
    },
    {
      notaEsperada: undefined,
      nombreMateria: undefined,
      notas: this.notasVacias
    }
  
  ];
  
  /*
  [{
    notaEsperada: undefined,
    nombreMateria: undefined,
    notas: this.notasVacias
  }]
 */
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

  addNotas(cantidad: string, notaEsperada: string ){
    console.log(cantidad, notaEsperada);
    this.nota.push({
      cantidad, 
      notaEsperada
    })
    this.cantidadDeNotas = cantidad;
    this.notaEsperada = notaEsperada;
    console.log("add notas", this.nota)
  }

  calculoRealizado(nota, porcentaje, notas){
    this.notaFaltante = nota;
    this.porcentajeFaltante = porcentaje;
    this.save(notas)
    console.log("Deberia estar en 0", this.controlNotas)
  }

  public algo(){
    console.log("aglo",this.controlNotas)
  }

  public save(notasIngresadas: NotaConPorcentaje[]){
    this.controlNota = new NotasMateria("algo", 3, notasIngresadas);
    this.controlNotas[0].nombreMateria = "aaaa";
    this.controlNotas[0].notaEsperada = 5;
    this.controlNotas.push(this.controlNota);
    this.storage.set("Materias", this.controlNotas)
    //this.storage.set("Materias", null)
    console.log("se guarda")
    this.load();
  }

  public async load(){
    
    let result: NotasMateria[] = await this.storage.get("Materias");
    console.log("yyyy", result)
    this.controlNotas = result;
    return result;
    
    console.log("a")
  }

}
