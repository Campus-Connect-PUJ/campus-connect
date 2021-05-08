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

  obtenerHorarios(monitor: UsuarioGeneral){
    let indice = 0;
    for(let i=0; i<monitor.monitorDe.length; i++){
      if(monitor.monitorDe[i].asignatura.id == +this.idMonitor){
        indice = i;
      }
    }

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
          console.log("-", monitor.monitorDe[j].horarios[k].fechaInicial)
          monitor.monitorDe[j].horarios[k].fechaInicial = moment(monitor.monitorDe[j].horarios[k].fechaInicial).subtract(Number(5),'hours').toDate();
          monitor.monitorDe[j].horarios[k].fechaFinal = moment(monitor.monitorDe[j].horarios[k].fechaFinal).subtract(Number(5),'hours').toDate();
          console.log(monitor.monitorDe[j].horarios[k].fechaInicial)
        }
      }
    
  }

}
