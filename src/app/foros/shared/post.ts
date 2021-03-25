import { UsuarioGeneral } from "src/app/tips/shared/tips";

export class Post {
  id: number;
  fecha: Date;
  reportado: boolean;
  respuestaPost: RespuestaPost[] = [];
  constructor(
    public titulo: string,
    public descripcion: string,
    public usuario: UsuarioGeneral
  ) {
    this.reportado = false;
  }
}

export class RespuestaPost {
  id: number;
  fecha: Date;
  reportado: boolean;
  constructor(
    public postId: number,
    public texto: string,
    public usuario: UsuarioGeneral
  ){
    this.reportado = false;
  }
}
