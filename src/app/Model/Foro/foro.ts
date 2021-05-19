import { RespuestaForo } from "../RespuestasForo/respuestas-foro";
import { UsuarioGeneral } from "../UsuarioGeneral/usuario-general";

export class Foro {
  id: number;
  fecha: Date;
  reportado: boolean;
  respuestas: RespuestaForo[];
  puntaje: number;
  usuariosGustaron: UsuarioGeneral[];
  usuariosNoGustaron: UsuarioGeneral[];
  constructor(
    public titulo: string,
    public descripcion: string,
    public usuario: UsuarioGeneral
  ) {
    this.reportado = false;
    this.usuariosGustaron = Array<UsuarioGeneral>();
    this.usuariosNoGustaron = Array<UsuarioGeneral>();
  }
}
