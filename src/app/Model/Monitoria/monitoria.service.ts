import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NetService } from 'src/app/utils/net.service';
import { environment } from 'src/environments/environment';
import { UsuarioGeneral } from '../UsuarioGeneral/usuario-general';
import { Monitoria } from './monitoria';

@Injectable({
  providedIn: 'root'
})
export class MonitoriaService {

  constructor(private net: NetService) { }


  crearMonitoria(mon: Monitoria){
    const url = `${environment.baseUrl}/usuario/agregarMonitoria`;
    return this.net.post(
      url,
      {
        "idAsignatura": mon.asignatura.id
      }
    )
  }

  agregarHorario(mon: Monitoria, indice: number){
    const url = `${environment.baseUrl}/usuario/agregarHorario`;
    return this.net.post(
      url,
      {
        "idAsignatura": mon.asignatura.id,
        //"fi": mon.horarios[indice].fechaInicio,
        //"ff": mon.horarios[indice].fechaFin,
        "fechaInicial": mon.horarios[indice].fechaInicial,
        "fechaFinal": mon.horarios[indice].fechaFinal,
        "lugar": mon.horarios[indice].lugar
      }
    )
  }

  borrarHorario(mon: Monitoria){
    const url = `${environment.baseUrl}/usuario/borrarHorario`;
    return this.net.put(
      url,
      {
        "idAsignatura": mon.asignatura.id,
        "fi": mon.horarios[0].fechaInicio,
        "ff": mon.horarios[0].fechaFin,
        "fechaInicial": mon.horarios[0].fechaInicial,
        "fechaFinal": mon.horarios[0].fechaFinal
      }
    )
  }

  obtenerMonitores(): Observable<UsuarioGeneral[]>{
    const url = `${environment.baseUrl}/usuario/monitores/all`;
    return this.net.get<UsuarioGeneral[]>(url);
  }

  buscarMonitor(idMonitor){
    const url = `${environment.baseUrl}/usuario/${idMonitor}`;
    return this.net.get<UsuarioGeneral>(url);
  }

  votarMonitor(idMonitor, calificacion){
    const url = `${environment.baseUrl}/usuario/monitor/${idMonitor}/${calificacion}`;
    return this.net.put(
      url,
      {}
    )
  }

  horariosMonitor(idMonitor): Observable<Monitoria[]>{
    const url = `${environment.baseUrl}/usuario/monitor/15/${idMonitor}`;
    return this.net.get<Monitoria[]>(url);
  }

  


}
