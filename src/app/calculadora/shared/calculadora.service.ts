import { Injectable } from '@angular/core';
import { Nota, NotaConPorcentaje, NotasMateria } from 'src/app/Model/Nota/nota';
import { LoginService } from 'src/app/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class CalculadoraService {
  private nota: Nota[] = [];
  private cantidadDeNotas: number;
  private nombreMateria: string;
  private notaEsperada: number;
  private notaFaltante: number;
  private porcentajeFaltante: number;
  private notasVacias: NotaConPorcentaje[]= [];
  private controlNota: NotasMateria;
  private controlNotas: NotasMateria[] = [];
  private indice: number = 0;
  private notaActual: number = 0;
  private porcentajeActual: number = 0;

  constructor(
    private loginService: LoginService
  ) {}

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
    return this.controlNotas;
  }

  getnotaActual(){
    return this.notaActual;
  }

  getporcentajeActual(){
    return this.porcentajeActual;
  }

  getnotasVacias(){
    return this.notasVacias;
  }

  addNotas(cantidad: number, notaEsperada: number, nombreMateria: string){
    console.log(cantidad, notaEsperada);
    this.nota.push({
      cantidad, 
      notaEsperada
    })
    this.cantidadDeNotas = cantidad;
    this.notaEsperada = notaEsperada;
    this.nombreMateria = nombreMateria;
  }

  calculoRealizado(nombreMateria ,notaFaltante, porcentajeFaltante, notaEsperada, notas, indice, notaActual, porcentajeActual){
    this.notaFaltante = notaFaltante;
    this.porcentajeFaltante = porcentajeFaltante;
    this.indice = indice;
    this.nombreMateria = nombreMateria;
    this.notaActual = notaActual;
    this.porcentajeActual = porcentajeActual;
    this.notasVacias = notas;
    this.notaEsperada = notaEsperada;
  }


  public guardar(nombreMateria, notaEsperada, notas, notaActual, porcentajeActual){
    console.log(nombreMateria, notaEsperada, notas )
    this.controlNota = new NotasMateria(nombreMateria, notaEsperada, notas, notaActual, porcentajeActual);
    
    this.controlNotas = this.load();
    try {
      if(this.controlNotas.length>=0){
        if(this.indice!=-1){
          this.controlNotas[this.indice] = this.controlNota;
        }
        else{
          this.controlNotas.push(this.controlNota)
        }
        this.guardarMaterias(this.controlNotas)
      }
    } catch (error) {
      let controlNotas2: NotasMateria[] = 
        [{
          notaEsperada: undefined,
          nombreMateria: undefined,
          notas: this.notasVacias,
          notaActual: undefined,
          porcentajeActual: undefined
        }];
      controlNotas2[0].nombreMateria = nombreMateria;
      controlNotas2[0].notaEsperada = notaEsperada;
      controlNotas2[0].notas = notas;
      controlNotas2[0].porcentajeActual = porcentajeActual;
      controlNotas2[0].notaActual = notaActual;
      this.controlNotas = controlNotas2;
      this.guardarMaterias(this.controlNotas)
      this.guardarMaterias(controlNotas2)
    }
  }

  public guardarMaterias(nuevasMaterias: any){
    console.log("guardando:");
    console.log(nuevasMaterias);
    localStorage.setItem(
      "Materias" + this.loginService.getUser().email,
      JSON.stringify(nuevasMaterias)
    );
  }

  public load(): NotasMateria[] {

    console.log(JSON.stringify(localStorage.getItem("Materias" + this.loginService.getUser().email)));
    const elemento = JSON.parse(
      localStorage.getItem("Materias" + this.loginService.getUser().email)
    );
    return elemento;
  }
  
  public findNotas(id){
    this.indice = id;
    return this.controlNotas[id];
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
