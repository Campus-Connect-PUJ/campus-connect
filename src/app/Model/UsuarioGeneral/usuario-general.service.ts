import { Injectable } from '@angular/core';
import { NetService } from 'src/app/utils/net.service';
import { environment } from 'src/environments/environment';
import { ReseniaRestaurante } from '../ReseniaRestaurante/resenia-restaurante';
import { ReseniaGrupo } from '../ReseniaGrupo/reseniaGrupo';
import { UsuarioGeneral } from './usuario-general';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGeneralService {

  constructor(private net: NetService) { }

  createUsuarioGeneral(usuario: UsuarioGeneral) {
    const url = `${environment.baseUrl}/createUser`;
    return this.net.post(
      url,
      usuario // TODO: definir los datos exactos que se necesitan
      // {
      //   cantidadEstrellas: resenia.cantEstrellas
      // }
    );

  }

  createReseniaGrupo(resenia: ReseniaGrupo, usuario: UsuarioGeneral) {
    const url = `${environment.baseUrl}/usuario/${usuario.id}/resenha_grupo_grupo_estudiantil/${resenia.id}`;
    return this.net.post(
      url,
      {
        cantidadEstrellas: resenia.cantEstrellas
      }
    );
  }

  createReseniaRestaurante(resenia: ReseniaRestaurante, usuario: UsuarioGeneral) {
    const url = `${environment.baseUrl}/usuario/${usuario.id}/resenha_restaurante/${resenia.id}`;
    return this.net.post(
      url,
      {
        cantidadEstrellas: resenia.cantEstrellas
      }
    );
  }
}
