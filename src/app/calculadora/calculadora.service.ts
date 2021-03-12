import { Injectable } from '@angular/core';
import { Nota, NotasMateria } from './notas.model';
import { Storage } from '@ionic/storage';

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


  constructor(
    private storage: Storage
  ) { }

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

  public async obtenerTodasLasNotas(key: string){
    this.storage.get(key).then((val)=> {console.log('Your name',val);})
  }

  public guardarNotas(key: string, materias: NotasMateria){
    this.storage.set(key, materias)
  }

}
