import { UsuarioGeneral } from "./UsuarioGeneral.model";
import { RespuestaForo } from './RespuestaForo.model';

export class Foro {
  id: number;
  fecha: Date;
  reportado: boolean;
  respuestaPost: RespuestaForo[] = [];
  constructor(
    public titulo: string,
    public descripcion: string,
    public usuario: UsuarioGeneral
  ) {
    this.reportado = false;
  }
}


