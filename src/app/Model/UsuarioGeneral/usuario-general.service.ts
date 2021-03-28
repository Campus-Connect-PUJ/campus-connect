import { Injectable } from '@angular/core';
import { NetService } from 'src/app/utils/net.service';
import { Observable } from 'rxjs';
// import { NetService } from '@utils/net.service';
import { environment } from 'src/environments/environment';
import { ReseniaRestaurante } from '../ReseniaRestaurante/resenia-restaurante';
import { ReseniaGrupo } from '../ReseniaGrupo/reseniaGrupo';
import { UsuarioGeneral } from './usuario-general';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGeneralService {

  constructor(private net: NetService) { }

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
