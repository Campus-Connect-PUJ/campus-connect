import { Injectable } from '@angular/core';
import { NetService } from 'src/app/utils/net.service';
import { environment } from 'src/environments/environment';
import { ReseniaRestaurante } from '../ReseniaRestaurante/resenia-restaurante';
import { ReseniaGrupo } from '../ReseniaGrupo/reseniaGrupo';
import { UsuarioGeneral } from './usuario-general';
import { Carrera } from '../Carrera/carrera';
import { Observable } from 'rxjs';
import { InformacionUsuario } from '../InformacionUsuario/informacion-usuario';

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

    const info = {
      fechaNacimiento: date,
      carreras: carreras.map((c) => c.id),
      religion: religion,
      local: local,
      grupoEtnico: grupoEtnico,
      sexo: sexo,
      genero: genero
    };

    const ret = this.net.post(
      url,
      info
    );

    return ret as unknown as Observable<InformacionUsuario>;
  }

  createReseniaGrupo(resenia: ReseniaGrupo) {
    const url = `${environment.baseUrl}/usuario/resenha_grupo_grupo_estudiantil/${resenia.id}`;
    return this.net.post(
      url,
      {
        cantidadEstrellas: resenia.cantEstrellas
      }
    );
  }

  createReseniaRestaurante(resenia: ReseniaRestaurante) {
    const url = `${environment.baseUrl}/usuario/resenha_restaurante/${resenia.id}`;
    return this.net.post(
      url,
      {
        cantidadEstrellas: resenia.cantEstrellas
      }
    );
  }

  getUsuario(id: number): Observable<UsuarioGeneral> {
    const url = `${environment.baseUrl}/usuario/${id}`;
    return this.net.get<UsuarioGeneral>(url);
  }

}
