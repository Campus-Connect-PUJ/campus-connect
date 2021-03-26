import { Tip } from './Tip.model';
import { TipoAprendizaje } from './TipoAprendizaje.model';

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