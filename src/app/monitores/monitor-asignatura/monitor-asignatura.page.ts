import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { MonitoriaService } from 'src/app/Model/Monitoria/monitoria.service';
import { UsuarioGeneral } from 'src/app/Model/UsuarioGeneral/usuario-general';
import { Horario } from "../../Model/Horario/horario";

@Component({
  selector: 'app-monitor-asignatura',
  templateUrl: './monitor-asignatura.page.html',
  styleUrls: ['./monitor-asignatura.page.scss'],
})
export class MonitorAsignaturaPage implements OnInit {

  idMonitor = 0;
  monitores: Array<UsuarioGeneral> = [];
  monitor: UsuarioGeneral = new UsuarioGeneral(" ", " ", " ");
  voto = 0;
  errorSi = false;
  idMonitoria = 0;
  puntajeAsignatura = 0;

  horariosSugeridos: Horario[] = [];
  horarios: Horario[] = [];

  constructor(
    private activatedRoute: ActivatedRoute, 
    private monService: MonitoriaService,
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paraMap => {
      const recipeId = paraMap.get('monitorID')
      const recipeId2 = paraMap.get('asignaturaID')
      if(recipeId != null){
        this.idMonitor = +recipeId;
        this.monService.obtenerMonitores().subscribe(
          (result: UsuarioGeneral[]) => {
            this.monitores = result;
            for(let i=0; i<this.monitores.length; i++){
              if(this.monitores[i].id == this.idMonitor){
                this.monitor = this.monitores[i];
              }
            }
            this.idMonitoria = +recipeId2;
            this.arreglarFechas(this.monitor)
            this.obtenerHorarios(this.monitor);
            
            //this.sugerenciasHorariosMonitorias(this.monitor)
          },
          error => console.log(error)
        )
      }
      else{
        console.log("Lo otro")
      }
    })
  }

  enviarVoto(){
    if(this.voto > 5 || this.voto <= 0){
      this.errorSi = true;
    }
    else{
      this.errorSi = false;
      console.log("A la monitoria ", this.idMonitoria, " el voto ", this.voto)
      this.monService.votarMonitor(this.idMonitoria, this.voto).subscribe(
        result => {
          console.log(result)
          //this.iniciarMonitor()
        },
        error => console.log(error)
      )

    }
    console.log("voto ", this.voto)
  }

  obtenerHorarios(monitor: UsuarioGeneral){
    let indice = 0;
    console.log(this.idMonitoria)
    for(let i=0; i<monitor.monitorDe.length; i++){
      if(monitor.monitorDe[i].asignatura.id == +this.idMonitoria){
        indice = i;
      }
    }
    this.idMonitoria = monitor.monitorDe[indice].id;
    this.obtenerPuntajes(monitor, indice);
    for(let i=0; i<monitor.monitorDe[indice].horarios.length; i++){
      let data: Horario = new Horario();
      data.id = monitor.monitorDe[indice].horarios[i].id;
      data.fechaInicial = monitor.monitorDe[indice].horarios[i].fechaInicial;
      data.fechaFinal = monitor.monitorDe[indice].horarios[i].fechaFinal;
      data.lugar = monitor.monitorDe[indice].horarios[i].lugar;
      this.horarios.push(data);
    }
    
    this.ordenarHorarios();
  }

  ordenarHorarios(){
    const horariosOrdenados = this.horarios;

    horariosOrdenados.sort(function (a, b) {
      if( moment(a.fechaInicial).isBefore(b.fechaInicial) ){
        return -1;
      }
      if( !moment(a.fechaInicial).isBefore(b.fechaInicial)){
        return 1;
      }
      // a must be equal to b
      return 0;
    });
    this.horarios = horariosOrdenados;
    console.log(this.horarios)
  }

  convertir(fecha: Date): string{
    const resultado: string = moment(fecha).format("DD-MMM-YYYY HH:mm");
    return resultado;
  }

  
  arreglarFechas(monitor: UsuarioGeneral){
    console.log("entra");

      for(let j=0; j<monitor.monitorDe.length; j++){
        for(let k=0; k<monitor.monitorDe[j].horarios.length; k++){
          monitor.monitorDe[j].horarios[k].fechaInicial = moment(monitor.monitorDe[j].horarios[k].fechaInicial).subtract(Number(5),'hours').toDate();
          monitor.monitorDe[j].horarios[k].fechaFinal = moment(monitor.monitorDe[j].horarios[k].fechaFinal).subtract(Number(5),'hours').toDate();
        }
      }
    
  }

  obtenerPuntajes(monitor: UsuarioGeneral, id: number){
    let sumaTotal = 0;
    let cantidadVotos = 0;

    console.log(monitor)
    cantidadVotos += monitor.monitorDe[id].cantidadVotos;
    sumaTotal += monitor.monitorDe[id].calificacion;
    console.log("cantidad votos ", cantidadVotos, " ", sumaTotal)
    this.puntajeAsignatura = +(sumaTotal / cantidadVotos).toFixed(2);
    console.log("el puntaje ", this.puntajeAsignatura)
    return monitor;
  }

}
