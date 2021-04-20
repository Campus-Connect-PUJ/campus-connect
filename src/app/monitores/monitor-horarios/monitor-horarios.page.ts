import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MonitoriaService } from 'src/app/Model/Monitoria/monitoria.service';
import { UsuarioGeneral } from 'src/app/Model/UsuarioGeneral/usuario-general';
import * as moment from 'moment';
import { Monitoria } from 'src/app/Model/Monitoria/monitoria';

@Component({
  selector: 'app-monitor-horarios',
  templateUrl: './monitor-horarios.page.html',
  styleUrls: ['./monitor-horarios.page.scss'],
})
export class MonitorHorariosPage implements OnInit {
  idMonitor = 0;
  horarios: Monitoria[] = [];
  horasInicial: string[] = [];
  horasFinal: string[] = [];
  voto = 0;
  errorSi = false;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private monService: MonitoriaService
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paraMap => {
      const recipeId = paraMap.get('monitorID')
      this.idMonitor = Number(recipeId);
      console.log(this.idMonitor);
      this.findHorarios();
    })
    
  }

  findUsuario() {

  }

  findHorarios(){
    this.monService.horariosMonitor(this.idMonitor).subscribe(
      result => {
        this.horarios = result;
        console.log(this.horarios);
        console.log(typeof(this.horarios[0].horarios[0].fechaInicial))
        for(let i=0; i<this.horarios.length; i++){

          for(let j=0; j<this.horarios[i].horarios.length; j++){
            var date = moment(this.horarios[i].horarios[j].fechaInicial).format('DD-MM-YYYY HH:mm')
            this.horarios[i].horarios[j].fi = date;
            date = moment(this.horarios[i].horarios[j].fechaFinal).format('DD-MM-YYYY HH:mm')
            this.horarios[i].horarios[j].ff = date;
          }
          
        }
        
        console.log(date)
    },
      error => console.error(error)
    )
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


  enviarVoto(){
    if(this.voto > 5 || this.voto <= 0){
      this.errorSi = true;
    }
    else{
      this.errorSi = false;
      this.monService.votarMonitor(this.idMonitor,this.voto).subscribe(
        result => console.log(result),
        error => console.log(error)
      )

    }
    console.log("voto ", this.voto)
  }

}
