import { Injectable } from '@angular/core';
import { NetService } from 'src/app/utils/net.service';
import { environment } from 'src/environments/environment';
import { ReseniaRestaurante } from '../ReseniaRestaurante/resenia-restaurante';
import { ReseniaGrupo } from '../ReseniaGrupo/reseniaGrupo';
import { UsuarioGeneral } from './usuario-general';
import { Carrera } from '../Carrera/carrera';
import { Observable } from 'rxjs';
import { InformacionUsuario } from '../InformacionUsuario/informacion-usuario';
import { GrupoEstudiantil } from '../GrupoEstudiantil/grupo-estudiantil';
import { Restaurante } from '../Restaurante/restaurante';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGeneralService {
  user: UsuarioGeneral =  new UsuarioGeneral(" "," "," ");
  nombreUsuario: string = "usuario1";
  correo: string;
  semestre: number;


  constructor(private net: NetService) { }

  agregarInformacionUsuario(
    idUs: number,
    fechaNacimiento: Date,
    carreras: Carrera[],
    religion: string,
    local: boolean,
    grupoEtnico: string,
    sexo: string,
    genero: string
  ): Observable<InformacionUsuario> {
    const date = new Date(fechaNacimiento).toISOString();
    const url = `${environment.baseUrl}/informacion_usuario/${idUs}`;
    let info = {
      fechaNacimiento: date,
      carreras: carreras.map((c) => c.id),
      religion: religion,
      local: local,
      grupoEtnico: grupoEtnico,
      sexo: sexo,
      genero: genero
    };

    console.log("cosa esta: " + JSON.stringify(info))
    let ret = this.net.post(
      url,
      info
    );

    return ret as unknown as Observable<InformacionUsuario>;

  }

  createReseniaGrupo(calificacion: number, id: number, id_res: number) {
    const url = `${environment.baseUrl}/${id}/resenha_grupo_estudiantil/${id_res}/${calificacion}`;
    return this.net.post(
      url,{}
      );
  }

  createReseniaRestaurante(calificacion: number, id: number, id_res: number) {
    const url = `${environment.baseUrl}/usuario/${id}/resenha_restaurante/${id_res}/${calificacion}`;
    return this.net.post(
      url,
      {}
    );
  }

}
