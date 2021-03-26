import { Tip } from "../Tip/tip";
import { TipoAprendizaje } from "../TipoAprendizaje/tipo-aprendizaje";

export class UsuarioGeneral {
    id: number;
    tips: Tip[];
    estilosAprendizaje: TipoAprendizaje[];
    constructor(
      public nombre: string,
      public correo: string,
      public semestre: number
    ) {}
}
