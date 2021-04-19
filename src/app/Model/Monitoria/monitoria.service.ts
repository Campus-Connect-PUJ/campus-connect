import { Injectable } from '@angular/core';
import { NetService } from 'src/app/utils/net.service';
import { environment } from 'src/environments/environment';
import { Monitoria } from './monitoria';

@Injectable({
  providedIn: 'root'
})
export class MonitoriaService {

  constructor(private net: NetService) { }

  guardarMonitorias(idUsuario: number, monitoria: Monitoria ){
    idUsuario = 1;
    const url = `${environment.baseUrl}/usuario/agregarMonitoria/${idUsuario}`;

    console.log("->",idUsuario);
    return this.net.post(
      url,
      {
        "asignatura": monitoria.asignatura.nombre,
        "fechaInicial": "2021-04-18T20:52:34.962109100",
        "fechaFinal": "2021-04-18T20:52:34.962109100"
      }
    );
  }


}
