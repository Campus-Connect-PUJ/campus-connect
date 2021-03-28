import { ReseniaGrupo } from "../ReseniaGrupo/reseniaGrupo";
import { Tip } from "../Tip/tip";
import { TipoAprendizaje } from "../TipoAprendizaje/tipo-aprendizaje";
import { TipoComida } from "../TipoComida/tipo-comida";

export class UsuarioGeneral {
    id: number;
    tips: Tip[];
    estilosAprendizaje: TipoAprendizaje[];
    reseniasGrupo: ReseniaGrupo[];
    constructor(
      public nombre: string,
      public correo: string,
      public semestre: number
    ) {}
}
