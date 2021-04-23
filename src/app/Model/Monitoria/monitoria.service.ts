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

  guardarMonitorias(idUsuario: number, monitorias: Array<Monitoria> ){
    const url = `${environment.baseUrl}/usuario/agregarMonitoria/${idUsuario}`;
    
    //console.log("->",monitoria.horarios);
    return this.net.post(
      url,
      {
        monitorias
      }
    );
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
