import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MonitoriaService } from 'src/app/Model/Monitoria/monitoria.service';
import { UsuarioGeneral } from 'src/app/Model/UsuarioGeneral/usuario-general';
import * as moment from 'moment';

@Component({
  selector: 'app-monitor-horarios',
  templateUrl: './monitor-horarios.page.html',
  styleUrls: ['./monitor-horarios.page.scss'],
})
export class MonitorHorariosPage implements OnInit {
  idUsuario = 0;
  usuario: UsuarioGeneral= new UsuarioGeneral(" "," "," ");
  dates = [];

  constructor(
    private activatedRoute: ActivatedRoute, 
    private monService: MonitoriaService
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paraMap => {
      const recipeId = paraMap.get('monitorID')
      this.idUsuario = Number(recipeId);
      console.log(this.idUsuario);
    })
    this.findUsuario();
    this.findHorarios();
  }

  findUsuario() {
    this.monService.buscarMonitor(this.idUsuario).subscribe(
      result => {
      this.usuario = result;
      let horarios;
      horarios = this.usuario.monitorDe[0].horarios[0];
      console.log(horarios);
        
      /*
      let fechaInicio = moment();
      let fechaFinal = moment(fechaInicio).add(14,'days')
      let fecha = moment(this.usuario.monitorDe[0].horarios[0].fechaFinal);
      let i=0;
      while(moment(fecha).isBefore(fechaFinal)){
        this.dates.push(fecha);
        fecha = moment(this.usuario.monitorDe[i].horarios[0].fechaFinal);
        i++;
      }
      console.log(this.dates)
      */

    },
      error => console.error(error)
    )
  }

  findHorarios(){
    console.log(this.usuario.monitorDe)

    /*
    let fechaInicio = moment();
    let fechaFinal = moment(fechaInicio).add(14,'days')
    let fecha = this.usuario.monitorDe;
    console.log(fecha);
*/
    /*
    while(moment(fechaInicio).isBefore(fechaFinal)){


      fechaInicio = moment(fechaInicio).add(14,'days')
    }
    */


  }

}
