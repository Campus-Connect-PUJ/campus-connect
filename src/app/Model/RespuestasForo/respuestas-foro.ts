import { UsuarioGeneral } from "../UsuarioGeneral/usuario-general";

export class RespuestaForo {
    id: number;
    fecha: Date;
    reportado: boolean;
    constructor(
      public foroId: number,
      public texto: string,
      public usuario: UsuarioGeneral
    ){
      this.reportado = false;
    }
  }
