import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MonitoriaService } from 'src/app/Model/Monitoria/monitoria.service';
import { UsuarioGeneral } from 'src/app/Model/UsuarioGeneral/usuario-general';
import * as moment from 'moment';
import { Monitoria } from 'src/app/Model/Monitoria/monitoria';
import { Horario } from 'src/app/Model/Horario/horario';
import { LoginService } from 'src/app/services/login.service';
import { UsuarioGeneralService } from "../../Model/UsuarioGeneral/usuario-general.service";

@Component({
  selector: 'app-monitor-horarios',
  templateUrl: './monitor-horarios.page.html',
  styleUrls: ['./monitor-horarios.page.scss'],
})
export class MonitorHorariosPage implements OnInit {
  idMonitor = 0;
  
  horasInicial: string[] = [];
  horasFinal: string[] = [];
  monitores: UsuarioGeneral[] = [];
  usuarioActual: UsuarioGeneral;
  monitoresRecomendados:  Array<UsuarioGeneral> = [];
  voto = 0;
  errorSi = false;

  monitor: UsuarioGeneral = new UsuarioGeneral(" ", " ", " ");
  asignaturas: Array<Monitoria> = [];
  horariosSugeridos: Horario[] = [];
  horariosLimitados: Horario[] = [];
  cantidadDeSugerencias: Array<number> = [1,3,5,10,20,50,100];
  cantidadDeSugerenciasSeleccionadas: number = 3;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private monitoriaService: MonitoriaService,
    private usuarioService: UsuarioGeneralService,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      paraMap => {
        const recipeId = paraMap.get('monitorID')
        if(recipeId != null){
          this.idMonitor = +recipeId;
          this.iniciarMonitor();
        }
        else{
          console.log("Lo otro")
        }
      }
    );
  }

  iniciarMonitor(){
    this.usuarioService.getOtroUsuario(this.idMonitor).subscribe(
      (result: UsuarioGeneral) => {
        this.monitor = result;
        this.arreglarFechas(this.monitor)
        this.sugerenciasHorariosMonitorias(this.monitor.monitorDe);
        this.obtenerAsignaturas(this.monitor);

        this.obtenerPuntajes(this.monitor);
      },
      error => console.log(error)
    )
  }

  obtenerAsignaturas(monitor: UsuarioGeneral){
    let ingresar = true;
    for(let i=0; i<monitor.monitorDe.length; i++){
      if(this.asignaturas.length == 0){
        this.asignaturas.push(monitor.monitorDe[i])
      }
      else{
        for(let j=0; j<this.asignaturas.length && ingresar; j++){
          if(monitor.monitorDe[i].id == this.asignaturas[j].id){
            ingresar = false;
          }
        }
        if(ingresar){
          this.asignaturas.push(monitor.monitorDe[i])
        }
      }
    }
  }

 
  ordenarMonitores(monitores: Array<UsuarioGeneral>){
    let monitoresOrdenados = monitores;
    monitoresOrdenados.sort(function (a, b) {
      if (a.puntajeTotal > b.puntajeTotal) {
        return -1;
      }
      if (a.puntajeTotal < b.puntajeTotal) {
        return 1;
      }
      return 0;
    });
    return monitoresOrdenados;
  }

  obtenerPuntajes(monitor: UsuarioGeneral){
    let sumaTotal = 0;
    let cantidadVotos = 0;
    console.log(monitor);

    for (let j = 0; j < monitor.monitorDe.length; j++) {
      cantidadVotos += monitor.monitorDe[j].cantidadVotos;
      sumaTotal += monitor.monitorDe[j].calificacion;
      console.log(">>> ", cantidadVotos, " ", sumaTotal)
    }
    monitor.puntajeTotal = +(sumaTotal / cantidadVotos).toFixed(2);
    console.log("el puntaje ", monitor.puntajeTotal)
    return monitor;
  }


  sugerenciasHorariosMonitorias(eventosMonitor: Monitoria[]){
    let horarios: Horario[] = [];
    let fechaReferencia = moment();
    fechaReferencia = moment(fechaReferencia).add(30,'days');

    const eventos = JSON.parse(
      localStorage.getItem("eventos"+this.loginService.getUser().email)
    );

    for(let j=0; j<eventosMonitor.length; j++){
      for(let k=0; k<eventosMonitor[j].horarios.length; k++){

        console.log(JSON.stringify(eventosMonitor[j].horarios[k]));
        const horarioInicialMonitor = eventosMonitor[j].horarios[k].fechaInicial;
        const horarioFinalMonitor = eventosMonitor[j].horarios[k].fechaFinal;
        
        console.log(eventosMonitor[j].horarios[k].fechaInicial, " ", eventosMonitor[j].horarios[k].fechaFinal)
        console.log("->>", moment(eventosMonitor[j].horarios[k].fechaInicial).format("DD-MMM-YYYY HH:mm"))

        let ocupado = false;
        try {
          for(let i=0; i<eventos.length && !ocupado; i++){
            if( moment(moment(eventos[i].startTime)).isBetween(horarioInicialMonitor, horarioFinalMonitor, undefined, '(]') || moment(moment(eventos[i].endTime)).isBetween(horarioInicialMonitor, horarioFinalMonitor, undefined, '[)') ){
              ocupado = true;
            }
            else if( moment(moment(horarioInicialMonitor)).isBetween(
              moment(eventos[i].startTime), moment(eventos[i].endTime), undefined, '(]'
            ) ||
                moment(moment(horarioFinalMonitor)).isBetween(
                  moment(eventos[i].startTime),  moment(eventos[i].endTime), undefined, '[)'
                )){
              ocupado = true;
            }
          }  
        } catch (error) {
          console.log("usuario sin eventos")
        }

        if(!ocupado){
          //Cancelar cuando ya sean varios eventos sugeridos
          //if( moment(horarioInicialMonitor).isSameOrBefore(fechaReferencia) && moment(horarioFinalMonitor).isSameOrBefore(fechaReferencia)){
            this.agregarHorariosSugeridos(eventosMonitor[j], eventosMonitor[j].horarios[k]);
         // }

        }   
      }
    }
    
    this.ordenarSugerencias();
  }

  ordenarSugerencias(){
    const sugerenciasOrdenadas = this.horariosSugeridos;

    sugerenciasOrdenadas.sort(function (a, b) {
      if( moment(a.fechaInicial).isBefore(b.fechaInicial) ){
        return -1;
      }
      if( !moment(a.fechaInicial).isBefore(b.fechaInicial)){

        return 1;
      }
      // a must be equal to b
      return 0;
    });
    
    
    this.horariosSugeridos = sugerenciasOrdenadas;
    this.limitarSugerencias();
  }


  limitarSugerencias(){
    this.horariosLimitados = [];
    let sugerenciasOrdenadas = this.horariosSugeridos;
    let sugerencias: Horario[] = [];

    if(sugerenciasOrdenadas.length >= this.cantidadDeSugerenciasSeleccionadas){
      for(let i=0; i<this.cantidadDeSugerenciasSeleccionadas; i++){
        sugerencias.push(sugerenciasOrdenadas[i])
      }
      sugerenciasOrdenadas = sugerencias;
    }
    this.horariosLimitados = sugerenciasOrdenadas;
  }

  agregarHorariosSugeridos(datos: Monitoria, horario: Horario) {
    const data: Horario = new Horario();
    let ingresar = true;
    data.id = horario.id;
    data.nombreAsignatura = datos.asignatura.nombre;
    data.fechaInicial = horario.fechaInicial;
    data.fechaFinal = horario.fechaFinal;
    data.lugar = horario.lugar;
    console.log(data.fechaInicial.toLocaleString())
    if(this.horariosSugeridos.length==0){
      this.horariosSugeridos.push(data);
    }
    else{
      for(let i=0; i<this.horariosSugeridos.length; i++){
        if(this.horariosSugeridos[i].id == data.id){
          ingresar = false;
        }
      }
      if(ingresar){
        this.horariosSugeridos.push(data);
      }
    }
  }

  findHorarios(){
    this.monitoriaService.horariosMonitor(this.idMonitor).subscribe(
      (result: Monitoria[]) => {
        const horarios = result;

        console.log(JSON.stringify(horarios));

        for(let i=0; i<horarios.length; i++){
          for(let j=0; j<horarios[i].horarios.length; j++){
            horarios[i].horarios[j].fechaInicial = 
                horarios[i].horarios[j].fechaInicial;
            horarios[i].horarios[j].fechaFinal =
                horarios[i].horarios[j].fechaFinal;

          }
        }
    },
      error => console.error(error)
    )
  }

  enviarVoto(){
    if(this.voto > 5 || this.voto <= 0){
      this.errorSi = true;
    }
    else{
      this.errorSi = false;
      this.monitoriaService.votarMonitor(this.idMonitor,this.voto).subscribe(
        result => {
          console.log(result)
          this.iniciarMonitor()
        },
        error => console.log(error)
      )

    }
    console.log("voto ", this.voto)
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
