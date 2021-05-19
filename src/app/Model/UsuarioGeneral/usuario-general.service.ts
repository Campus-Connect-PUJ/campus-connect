import { Injectable } from '@angular/core';
import { NetService } from 'src/app/utils/net.service';
import { environment } from 'src/environments/environment';
import { UsuarioGeneral } from './usuario-general';
import { Carrera } from '../Carrera/carrera';
import { Observable } from 'rxjs';
import { InformacionUsuario } from '../InformacionUsuario/informacion-usuario';

import { ReseniaGrupo } from "../ReseniaGrupo/reseniaGrupo";
import { ReseniaRestaurante } from "../ReseniaRestaurante/resenia-restaurante";

@Injectable({
  providedIn: 'root'
})
export class UsuarioGeneralService {

  constructor(private net: NetService) { }

  agregarInformacionUsuario(
    fechaNacimiento: Date,
    carreras: Carrera[],
    religion: string,
    local: boolean,
    grupoEtnico: string,
    sexo: string,
    genero: string
  ): Observable<InformacionUsuario> {
    const date = new Date(fechaNacimiento).toISOString();
    const url = `${environment.baseUrl}/usuario/informacion`;

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
    const url = `${environment.baseUrl}/usuario/resenha_grupo_estudiantil/${resenia.grupoEstudiantil.id}`;
    return this.net.post(
      url,{
        "estrellas": resenia.estrellas
      } 
      );
  }

  createReseniaRestaurante(resenia: ReseniaRestaurante) {
    const url = `${environment.baseUrl}/usuario/resenha_restaurante/${resenia.restaurante.id}`;
    return this.net.post(
      url,
      {
        "estrellas": resenia.estrellas
      } 
    );
  }

  persoGrupos(carac: number[], actividades: string[], hobbies: string[]) : Observable<UsuarioGeneral> {
    const url = `${environment.baseUrl}/usuario/persoGrupos`;
    return this.net.put(
      url,
      {
        "caracteristicas":carac,
        "actividades":actividades,
        "hobbies":hobbies
      }
    ) as unknown as Observable<UsuarioGeneral>;
  }

  persoRestaurantes(regimenAl: number, nivelExigencia: number, ambientacion: string, comida: number[]) : Observable<UsuarioGeneral> {
    console.log("regimen:" + regimenAl);
    const url = `${environment.baseUrl}/usuario/persoRestaurantes`;
    return this.net.put(
      url,
      {
        "regimenAlimenticio":regimenAl,
        "nivelExigencia":nivelExigencia,
        "comidas":comida,
        "ambientacion":ambientacion
      }
    ) as unknown as Observable<UsuarioGeneral>;
  }

  getUsuario(): Observable<UsuarioGeneral> {
    const url = `${environment.baseUrl}/usuario`;
    return this.net.get<UsuarioGeneral>(url);
  }

  getOtroUsuario(id: number): Observable<UsuarioGeneral> {
    const url = `${environment.baseUrl}/usuario/${id}`;
    return this.net.get<UsuarioGeneral>(url);
  }

  // conseguir la informacion del usuario usando el token
  getInfoUsuario(): Observable<UsuarioGeneral>{
    const url = `${environment.baseUrl}/usuario/data`;
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
