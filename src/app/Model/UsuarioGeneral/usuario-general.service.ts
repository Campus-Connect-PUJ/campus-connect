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
import { Caracteristica } from '../Caracteristica/caracteristica';

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
      url,{} // TODO
      );
  }

  createReseniaRestaurante(calificacion: number, id: number, id_res: number) {
    const url = `${environment.baseUrl}/usuario/${id}/resenha_restaurante/${id_res}/${calificacion}`;
    return this.net.post(
      url,
      {} // TODO
    );
  }

  persoGrupos(carac: number[], actividades: string[], hobbies: string[]){
    const url = `${environment.baseUrl}/usuario/persoGrupos`;
    return this.net.put(
      url,
      {
        "caracteristicas":carac,
        "actividades":actividades,
        "hobbies":hobbies
      }
    );
  }

  persoRestaurantes(regimenAl: number, nivelExigencia: number, ambientacion: string, comida: number[]){
    const url = `${environment.baseUrl}/usuario/persoRestaurantes`;
    return this.net.put(
      url,
      {
        "regimenAlimenticio":regimenAl,
        "nivelExigencia":nivelExigencia,
        "comidas":comida,
        "ambientacion":ambientacion
      }
    );
  }

  getUsuario(id: number): Observable<UsuarioGeneral> {
    const url = `${environment.baseUrl}/usuario/${id}`;
    return this.net.get<UsuarioGeneral>(url);
  }

  getUsuarios(): Observable<UsuarioGeneral[]>{
    const url = `${environment.baseUrl}/usuario/all`;
    return this.net.get<UsuarioGeneral[]>(url);
  }

  cambiarRol(idUsuario: number, rol: number): Observable<UsuarioGeneral> {
    console.log("Se envia ", idUsuario, " ", rol);
    //const url = `${environment.baseUrl}/usuario/rol/${idUsuario}/${rol}`;
    const url = `${environment.baseUrl}/usuario/rolMonitor`
    return this.net.get<UsuarioGeneral>(url);
    //return this.net.post(
      //url,
      //{}
    //);
  }

}
