import { UsuarioGeneral } from "../UsuarioGeneral/usuario-general";

export class RespuestaForo {
    id: number;
    fecha: Date;
    reportado: boolean;
    texto: string;
    usuario: UsuarioGeneral;
    constructor(){
      this.reportado = false;
    }
  }
