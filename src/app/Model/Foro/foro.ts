import { RespuestaForo } from "../RespuestasForo/respuestas-foro";
import { UsuarioGeneral } from "../UsuarioGeneral/usuario-general";

export class Foro {
  id: number;
  fecha: Date;
  reportado: boolean;
  respuestas: RespuestaForo[];
  constructor(
    public titulo: string,
    public descripcion: string,
    public usuario: UsuarioGeneral
  ) {
    this.reportado = false;
  }
}
