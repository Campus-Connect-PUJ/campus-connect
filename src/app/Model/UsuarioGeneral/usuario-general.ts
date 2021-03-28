import { RegimenAlimenticio } from "../RegimenAlimenticio/regimen-alimenticio";
import { ReseniaGrupo } from "../ReseniaGrupo/reseniaGrupo";
import { ReseniaRestaurante } from "../ReseniaRestaurante/resenia-restaurante";
import { Tip } from "../Tip/tip";
import { TipoAprendizaje } from "../TipoAprendizaje/tipo-aprendizaje";
import { TipoComida } from "../TipoComida/tipo-comida";

export class UsuarioGeneral {
    id: number;
    tips: Tip[];
    estilosAprendizaje: TipoAprendizaje[];
    reseniasGrupo: ReseniaGrupo[];
    reseniaRestaurante: ReseniaRestaurante[];
    regimenAlimenticio: RegimenAlimenticio;
    nivelRegimenAlimenticio: number;
    constructor(
      public nombre: string,
      public correo: string,
      public semestre: number
    ) {}
}
