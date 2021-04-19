import { TipoAprendizaje } from "../TipoAprendizaje/tipo-aprendizaje";
import { UsuarioGeneral } from "../UsuarioGeneral/usuario-general";

export class Tip {
    id: number;
    descripcion: string;
    usuario: UsuarioGeneral;
    tiposAprendizaje: TipoAprendizaje[];
    puntaje: number;

    constructor(){}
}
