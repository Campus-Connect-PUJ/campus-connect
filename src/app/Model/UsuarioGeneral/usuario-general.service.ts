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

  createReseniaGrupo(resenia: ReseniaGrupo, usuario: UsuarioGeneral, grupo: GrupoEstudiantil) {
    const url = `${environment.baseUrl}/usuario/${usuario.id}/resenha_grupo_grupo_estudiantil/${grupo.id}`;
    return this.net.post(
      url,
      {
        "foroData": resenia,
        "idUsuario": usuario.id,
        "idRestaurante": grupo.id
      }
    );
  }

  createReseniaRestaurante(resenia: ReseniaRestaurante, usuario: UsuarioGeneral, restaurante:Restaurante) {
    const url = `${environment.baseUrl}/usuario/${usuario.id}/resenha_restaurante/${restaurante.id}`;
    return this.net.post(
      url,
      {
        "foroData": resenia,
        "idUsuario": usuario.id,
        "idRestaurante": restaurante.id
      }
    );
  }

}
