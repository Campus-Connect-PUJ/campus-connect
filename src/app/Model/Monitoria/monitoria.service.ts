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

  guardarMonitorias(monitoria: Monitoria ){
    const url = `${environment.baseUrl}/usuario/agregarMonitoria`;

    console.log("->",monitoria);
    return this.net.post(
      url,
      {
        "asignatura": monitoria.asignatura.id,
        "fechaInicial": monitoria.horarios[0].fechaInicial,
        "fechaFinal": monitoria.horarios[0].fechaFinal
      }
    );
  }

  obtenerMonitores(): Observable<UsuarioGeneral[]>{
    const url = `${environment.baseUrl}/usuario/monitores/all`;

    return this.net.get<UsuarioGeneral[]>(url);
  }


}
