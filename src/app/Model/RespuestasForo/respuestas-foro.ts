import { UsuarioGeneral } from "../UsuarioGeneral/usuario-general";

export class RespuestaForo {
    id: number;
    fecha: Date;
    reportado: boolean;
    texto: string;
    usuario: UsuarioGeneral;
    puntaje: number;
    idForoRespondido: number;
    usuariosGustaron: UsuarioGeneral[];
    usuariosNoGustaron: UsuarioGeneral[];
    constructor(){
      this.reportado = false;
      this.usuariosGustaron = Array<UsuarioGeneral>();
      this.usuariosNoGustaron = Array<UsuarioGeneral>();
    }
  }
