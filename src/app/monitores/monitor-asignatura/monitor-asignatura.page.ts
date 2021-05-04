import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Monitoria } from 'src/app/Model/Monitoria/monitoria';
import { MonitoriaService } from 'src/app/Model/Monitoria/monitoria.service';
import { UsuarioGeneral } from 'src/app/Model/UsuarioGeneral/usuario-general';
import { HorarioMonitoria } from '../monitor-horarios/HorarioMonitoria';

@Component({
  selector: 'app-monitor-asignatura',
  templateUrl: './monitor-asignatura.page.html',
  styleUrls: ['./monitor-asignatura.page.scss'],
})
export class MonitorAsignaturaPage implements OnInit {ç

  recipeId: string;
  recipeId2: string;
  idMonitor = 0;
  monitores: Array<UsuarioGeneral> = [];
  monitor: UsuarioGeneral = new UsuarioGeneral(" ", " ", " ");

  horariosSugeridos: Array<HorarioMonitoria> = [];
  horarios: Array<HorarioMonitoria> = [];

  constructor(
    private activatedRoute: ActivatedRoute, 
    private monService: MonitoriaService,
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paraMap => {
      this.recipeId = paraMap.get('monitorID')
      this.recipeId2 = paraMap.get('asignaturaID')
      if(this.recipeId != null){
        this.idMonitor = +this.recipeId;
        this.monService.obtenerMonitores().subscribe(
          result => {
            this.monitores = result;
            for(let i=0; i<this.monitores.length; i++){
              if(this.monitores[i].id == this.idMonitor){
                this.monitor = this.monitores[i];
              }
            }
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
      if(monitor.monitorDe[i].asignatura.id == +this.recipeId2){
        indice = i;
      }
    }

    for(let i=0; i<monitor.monitorDe[indice].horarios.length; i++){
      let data: HorarioMonitoria = new HorarioMonitoria();
      data.id = monitor.monitorDe[indice].horarios[i].id;
      data.fechaInicio = monitor.monitorDe[indice].horarios[i].fechaInicio;
      data.fechaFin = monitor.monitorDe[indice].horarios[i].fechaFin;
      data.lugar = monitor.monitorDe[indice].horarios[i].lugar;
      this.horarios.push(data);
    }

    this.ordenarHorarios();
    
  }

  ordenarHorarios(){
    let horariosOrdenados = this.horarios;

    horariosOrdenados.sort(function (a, b) {
      if( moment(moment(a.fechaInicio, "DD-MM-YYYY HH:mm")).isBefore(moment(b.fechaInicio, "DD-MM-YYYY HH:mm")) ){
        return -1;
      }
      if( !moment(moment(a.fechaInicio, "DD-MM-YYYY HH:mm")).isBefore(moment(b.fechaInicio, "DD-MM-YYYY HH:mm"))){
        return 1;
      }
      // a must be equal to b
      return 0;
    });
    this.horarios = horariosOrdenados;
  }

  

  

}
